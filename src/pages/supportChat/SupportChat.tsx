import { useState, useEffect, useRef, useCallback } from "react";
import "./SupportChat.css";
import send_logo from "@/shared/img/send_logo.svg";
import mas_svg from "@/shared/img/message-logo.svg";
import manager_svg from "@/shared/img/manager-logo.svg";
import person_svg from "@/shared/img/person-logo.svg";

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userId, setUserId] = useState<any>(null);
  const chatLogsRef = useRef<any>(null);
  const socketRef = useRef<any>(null); // Ref для WebSocket соединения
  const processedMessagesRef = useRef<any>(new Set()); // Множество для уникальности сообщений
  const [hasFetchedHistory, setHasFetchedHistory] = useState<any>(false); // Состояние для проверки, был ли выполнен запрос

  const API_URL = "https://nyuroprintapiv1.ru:8765/api/chat-history"; // URL для получения истории чата

  // Устанавливаем userId и загружаем сообщения при монтировании компонента
  useEffect(() => {
    const storedUserId = localStorage.getItem("supportChatUserId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("supportChatUserId", newUserId);
      setUserId(newUserId);
    }

    // Загружаем старые сообщения из localStorage
    const storedMessages = localStorage.getItem("supportChatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
      const parsedMessages = JSON.parse(storedMessages);
      parsedMessages.forEach((msg: any) =>
        processedMessagesRef.current.add(msg.id)
      );
    }

    // Загружаем историю чата только если она еще не загружена
    const fetchChatHistory = async () => {
      const chatId = localStorage.getItem("chat_id");
      if (chatId && !hasFetchedHistory) {
        // Проверка на уже загруженную историю
        try {
          const response = await fetch(`${API_URL}?chat_id=${chatId}`);
          const data = await response.json();
          if (data.history) {
            data.history.forEach((msg: any) => {
              // Пропускаем сообщения с текстом 'None'
              if (msg && msg !== "None") {
                const messageType = msg.startsWith("Пользователь сайта: ")
                  ? "self"
                  : "user";
                const cleanedMessage = msg.replace(
                  /^Пользователь сайта:\s+/g,
                  ""
                );
                addMessage(generateMessage(cleanedMessage, messageType));
              }
            });
            setHasFetchedHistory(true); // Отмечаем, что история загружена
          }
        } catch (error) {
          console.error("Ошибка при получении истории чата:", error);
        }
      }
    };

    fetchChatHistory();
  }, [hasFetchedHistory]);

  // Подключаемся к WebSocket серверу только один раз
  useEffect(() => {
    const initializeSocket = () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        return;
      }

      const BACKEND_URL = `wss://nyuroprintapiv1.ru:8765/ws/${userId}`; // Подключение с client_id (userId)

      socketRef.current = new WebSocket(BACKEND_URL);

      socketRef.current.onopen = () => {
        console.log("WebSocket соединение установлено");
      };

      socketRef.current.onmessage = (event: any) => {
        const data = JSON.parse(event.data);

        if (data.uid) {
          const chat_id = localStorage.getItem("chat_id");
          if (chat_id) {
            socketRef.current.send(JSON.stringify({ chat_id: chat_id }));
          } else {
            console.error(`chat_id не найден для UID: ${data.uid}`);
            socketRef.current.send(JSON.stringify({ uid: data.uid }));
          }
        }

        if (data.chat_id) {
          localStorage.setItem("chat_id", data.chat_id);
          console.log(`chat_id сохранен: ${data.chat_id}`);
        }

        if (data.text) {
          addMessage(generateMessage(data.text, "user"));
        }

        // Добавьте обработку ошибок или сообщений типа "Invalid message format"
        if (data.error) {
          console.error(`Ошибка от сервера: ${data.error}`);
        }
      };

      socketRef.current.onerror = (error: any) => {
        console.error("WebSocket ошибка:", error);
        setTimeout(initializeSocket, 5000);
      };

      socketRef.current.onclose = (event: any) => {
        console.error("WebSocket соединение закрыто", event.reason);
        setTimeout(initializeSocket, 5000);
      };
    };

    if (userId) {
      initializeSocket();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [userId]); // Переподключение при изменении userId

  // Сохраняем сообщения в localStorage
  useEffect(() => {
    localStorage.setItem("supportChatMessages", JSON.stringify(messages));
  }, [messages]);

  // Прокручиваем чат до самого низа при открытии и добавлении сообщения
  useEffect(() => {
    if (isOpen && chatLogsRef.current) {
      chatLogsRef.current.scrollTop = chatLogsRef.current.scrollHeight;
    }
  }, [isOpen, messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: any) => {
    setInputMessage(e.target.value);
  };

  const addMessage = useCallback((newMessage: any) => {
    if (!processedMessagesRef.current.has(newMessage.id)) {
      processedMessagesRef.current.add(newMessage.id);
      setMessages((prevMessages: any) => {
        if (!prevMessages.some((msg: any) => msg.id === newMessage.id)) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    const newMessage = generateMessage(inputMessage, "self");
    addMessage(newMessage);
    setInputMessage("");

    try {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.send(
          JSON.stringify({ uid: userId, text: inputMessage })
        );
      } else {
        console.error("WebSocket не открыт");
      }
    } catch (error) {
      console.error("Ошибка отправки сообщения на сервер:", error);
    }
  };

  const generateMessage = (msg: any, type: any) => {
    return {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: msg,
      type: type,
    };
  };

  return (
    <div id="body">
      {!isOpen && (
        <div
          id="chat-circle"
          className="btn btn-raised"
          onClick={toggleChat}
        >
          <img
            src={mas_svg}
            alt="Логотип сообщения"
          />
        </div>
      )}

      {isOpen && (
        <div className="chat-box">
          <div className="chat-box-header">
            Поддержка
            <span
              className="chat-box-toggle"
              onClick={toggleChat}
            >
              <div className="material-icons">x</div>
            </span>
          </div>
          <div className="chat-box-body">
            <div className="chat-box-overlay"></div>
            <div
              className="chat-logs"
              ref={chatLogsRef}
            >
              <p>
                Отправляя сообщение Вы даёте свое согласие на{" "}
                <a
                  href="/consent"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  обработку персональных данных
                </a>
                .
              </p>
              {messages.map((message: any) => (
                <div
                  key={message.id}
                  className={`chat-msg ${message.type}`}
                >
                  <span className="msg-avatar">
                    <img
                      src={message.type === "self" ? person_svg : manager_svg}
                      alt="avatar"
                    />
                  </span>
                  <div className="cm-msg-text">{message.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="chat-input">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="chat-input"
                placeholder="Отправить сообщение..."
                value={inputMessage}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="chat-submit"
                id="chat-submit"
              >
                <div className="material-icons">
                  <img
                    src={send_logo}
                    alt="Логотип отправки сообщения"
                  />
                </div>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;
