import { useState } from "react";
import "./AddPrinter.css";
import axios from "axios";
import Cookies from "js-cookie";

interface AddPrinterPageProps {
  onSave?: any;
}

const AddPrinter = ({ onSave }: AddPrinterPageProps) => {
  const [formState, setFormState] = useState("state1");
  const [printerData1, setPrinterData1] = useState<any>({});
  const [printerData2, setPrinterData2] = useState<any>({});
  const [printerData3, setPrinterData3] = useState<any>({});

  const handleStateChange = (newState: any) => {
    setFormState(newState);
  };

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    switch (formState) {
      case "state1":
        setPrinterData1({
          ...printerData1,
          [name]: type === "checkbox" ? checked : value,
        });
        break;
      case "state2":
        setPrinterData2({
          ...printerData2,
          [name]: type === "checkbox" ? checked : value,
        });
        break;
      case "state3":
        setPrinterData3({
          ...printerData3,
          [name]: type === "checkbox" ? checked : value,
        });
        break;
      default:
        break;
    }
  };
  const AddIdToCookie = (id: any) => {
    let ids = Cookies.get("ids") ? Cookies.get("ids").split(",") : [];
    if (!ids.includes(id.toString())) {
      ids.push(id);
      Cookies.set("ids", ids.join(","), { expires: 365 });
    }
  };
  const addNewPrinter = async (e: any) => {
    e.preventDefault();
    let dataToSave;
    switch (formState) {
      case "state1":
        dataToSave = printerData1;
        break;
      case "state2":
        dataToSave = printerData2;
        break;
      case "state3":
        dataToSave = printerData3;
        break;
      default:
        break;
    }
    try {
      const response = await axios.post(
        "https://nyuroprintapiv1.ru:5000/api/printers/",
        dataToSave,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const printerId = response.data.printer_id;
      console.log("Ответ сервера:", response.data);
      AddIdToCookie(printerId);
      console.info("Принтер успешно добавлен");
      setTimeout(() => {
        onSave(printerId); // Вызываем функцию onSave, передавая в неё данные нового принтера
      }, 2000);
    } catch (error) {
      console.error("Ошибка при добавлении принтера", error);
      console.log("Ошибка при добавлении принтера", error);
    }
  };

  const renderFormState = () => {
    switch (formState) {
      case "state1":
        return (
          <div className="state1">
            <div className="block">
              <h2>Название принтера</h2>
              <label>
                <input
                  type="text"
                  name="name"
                  className="inputField"
                  value={printerData1.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
            <div className="block">
              <h2>Параметры принтера</h2>
              <div className="setting">
                <label htmlFor="val_print_x">X (ширина)</label>
                <input
                  type="number"
                  id="val_print_x"
                  name="val_print_x"
                  value={printerData1.val_print_x}
                  defaultValue={0}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="val_print_y">Y (глубина)</label>
                <input
                  type="number"
                  id="val_print_y"
                  name="val_print_y"
                  value={printerData1.val_print_y}
                  defaultValue={0}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="val_print_z">Z (высота)</label>
                <input
                  type="number"
                  id="val_print_z"
                  name="val_print_z"
                  value={printerData1.val_print_z}
                  defaultValue={0}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="view_table">Форма стола</label>
                <select
                  id="view_table"
                  name="view_table"
                  value={printerData1.view_table}
                  className="selectField"
                  onChange={handleInputChange}
                >
                  <option value="rectangular">Прямоугольный</option>
                  <option value="elliptic">Эллиптический</option>
                </select>
              </div>
              <div className="checkboxSetting">
                <label htmlFor="center_origin">Начало координат в центре</label>
                <input
                  type="checkbox"
                  id="center_origin"
                  name="center_origin"
                  checked={printerData1.center_origin}
                  onChange={handleInputChange}
                />
              </div>
              <div className="checkboxSetting">
                <label htmlFor="table_heating">Нагреваемый стол</label>
                <input
                  type="checkbox"
                  id="table_heating"
                  name="table_heating"
                  checked={printerData1.table_heating}
                  onChange={handleInputChange}
                />
              </div>
              <div className="checkboxSetting">
                <label htmlFor="print_volume_heating">
                  Подогреваемый объем печати
                </label>
                <input
                  type="checkbox"
                  id="print_volume_heating"
                  name="print_volume_heating"
                  checked={printerData1.print_volume_heating}
                  onChange={handleInputChange}
                />
              </div>
              <div className="setting">
                <label htmlFor="type_g_code">Вариант G-кода</label>
                <select
                  id="type_g_code"
                  name="type_g_code"
                  className="selectField"
                  value={printerData1.type_g_code}
                  onChange={handleInputChange}
                >
                  <option value="marlin">Marlin</option>
                  <option value="marlinVolumetric">Marlin (Volumetric)</option>
                  <option value="reprap">RepRap</option>
                  <option value="ultimaker2">Ultimaker 2</option>
                  <option value="griffin">Griffin</option>
                  <option value="makerbot">Makerbot</option>
                  <option value="bitsFromBytes">Bits from Bytes</option>
                  <option value="mach3">Mach 3</option>
                  <option value="repetier">Repetier</option>
                </select>
              </div>
              <div className="setting">
                <label htmlFor="start_g_code">Стартовый G-КОД</label>
                <textarea
                  id="start_g_code"
                  name="start_g_code"
                  rows={4}
                  value={printerData1.start_g_code}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="block">
              <h2>Параметры головы</h2>
              <div className="setting">
                <label htmlFor="min_x_head">X минимум</label>
                <input
                  type="number"
                  id="min_x_head"
                  name="min_x_head"
                  defaultValue={0}
                  value={printerData1.min_x_head}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="min_y_head">Y минимум</label>
                <input
                  type="number"
                  id="min_y_head"
                  name="min_y_head"
                  defaultValue={0}
                  value={printerData1.min_y_head}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="max_x_head">X максимум</label>
                <input
                  type="number"
                  id="max_x_head"
                  name="max_x_head"
                  defaultValue={0}
                  value={printerData1.max_x_head}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="max_y_head">Y максимум</label>
                <input
                  type="number"
                  id="max_y_head"
                  name="max_y_head"
                  defaultValue={0}
                  value={printerData1.max_y_head}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="height_portal">Высота портала</label>
                <input
                  type="number"
                  id="height_portal"
                  name="height_portal"
                  defaultValue={0}
                  value={printerData1.height_portal}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="checkboxSetting">
                <label htmlFor="displace_extruder">
                  Применить смещение экструдера к GCode
                </label>
                <input
                  type="checkbox"
                  id="displace_extruder"
                  name="displace_extruder"
                  checked={printerData1.displace_extruder}
                  onChange={handleInputChange}
                />
              </div>
              <div className="setting">
                <label htmlFor="end_g_code">Завершающий G-КОД</label>
                <textarea
                  id="end_g_code"
                  name="end_g_code"
                  rows={4}
                  value={printerData1.end_g_code}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="block">
              <button
                className="saveButton"
                onClick={addNewPrinter}
              >
                Сохранить
              </button>
            </div>
          </div>
        );
      case "state2":
        return (
          <div className="state2">
            <div className="block">
              <h2>Параметры сопла</h2>
              <div className="setting">
                <label htmlFor="extr_1_nozzle_diameter">Диаметр сопла</label>
                <input
                  type="number"
                  id="extr_1_nozzle_diameter"
                  name="extr_1_nozzle_diameter"
                  value={printerData2.extr_1_nozzle_diameter || 0}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="extr_1_filament_diameter">
                  Диаметр совместного материала
                </label>
                <input
                  type="number"
                  id="extr_1_filament_diameter"
                  name="extr_1_filament_diameter"
                  value={printerData2.extr_1_filament_diameter || 1.75}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="extr_1_nozzle_displacement_x">
                  Смещение сопла по оси X
                </label>
                <input
                  type="number"
                  id="extr_1_nozzle_displacement_x"
                  name="extr_1_nozzle_displacement_x"
                  value={printerData2.extr_1_nozzle_displacement_x || 0}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="extr_1_nozzle_displacement_y">
                  Смещение сопла по оси Y
                </label>
                <input
                  type="number"
                  id="extr_1_nozzle_displacement_y"
                  name="extr_1_nozzle_displacement_y"
                  value={printerData2.extr_1_nozzle_displacement_y || 0}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="extr_1_fan_number">
                  Номер охлаждающего вентилятора
                </label>
                <input
                  type="number"
                  id="extr_1_fan_number"
                  name="extr_1_fan_number"
                  value={printerData2.extr_1_fan_number || 0}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
            </div>

            <div className="block">
              <div className="setting">
                <label htmlFor="extr_1_start_g_code">
                  Стартовый G-код экструдера
                </label>
                <textarea
                  id="extr_1_start_g_code"
                  name="extr_1_start_g_code"
                  rows={4}
                  value={printerData2.extr_1_start_g_code}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="setting">
                <label htmlFor="extr_1_end_g_code">
                  Завершающий G-код экструдера
                </label>
                <textarea
                  id="extr_1_end_g_code"
                  name="extr_1_end_g_code"
                  rows={4}
                  value={printerData2.extr_1_end_g_code}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="block">
              <button className="saveButton">Сохранить</button>
            </div>
          </div>
        );
      case "state3":
        return (
          <div className="state3">
            <div className="block">
              <h2>Параметры сопла</h2>
              <div className="setting">
                <label htmlFor="extr_2_nozzle_diameter">Диаметр сопла</label>
                <input
                  type="number"
                  id="extr_2_nozzle_diameter"
                  name="extr_2_nozzle_diameter"
                  value={printerData3.extr_2_nozzle_diameter || 0}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="extr_2_filament_diameter">
                  Диаметр совместного материала
                </label>
                <input
                  type="number"
                  id="extr_2_filament_diameter"
                  name="extr_2_filament_diameter"
                  value={printerData3.extr_2_filament_diameter || 1.75}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="extr_2_nozzle_displacement_x">
                  Смещение сопла по оси X
                </label>
                <input
                  type="number"
                  id="extr_2_nozzle_displacement_x"
                  name="extr_2_nozzle_displacement_x"
                  value={printerData3.extr_2_nozzle_displacement_x || 0}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="extr_2_nozzle_displacement_y">
                  Смещение сопла по оси Y
                </label>
                <input
                  type="number"
                  id="extr_2_nozzle_displacement_y"
                  name="extr_2_nozzle_displacement_y"
                  value={printerData3.extr_2_nozzle_displacement_y || 0}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
              <div className="setting">
                <label htmlFor="extr_2_fan_number">
                  Номер охлаждающего вентилятора
                </label>
                <input
                  type="number"
                  id="extr_2_fan_number"
                  name="extr_2_fan_number"
                  value={printerData3.extr_2_fan_number || 0}
                  onChange={handleInputChange}
                />{" "}
                <span className="unit">ММ</span>
              </div>
            </div>

            <div className="block">
              <div className="setting">
                <label htmlFor="extr_2_start_g_code">
                  Стартовый G-код экструдера
                </label>
                <textarea
                  id="extr_2_start_g_code"
                  name="extr_2_start_g_code"
                  rows={4}
                  value={printerData3.extr_2_start_g_code}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="setting">
                <label htmlFor="extr_2_end_g_code">
                  Завершающий G-код экструдера
                </label>
                <textarea
                  id="extr_2_end_g_code"
                  name="extr_2_end_g_code"
                  rows={4}
                  value={printerData3.extr_2_end_g_code}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <div className="block">
              <button className="saveButton">Сохранить</button>
            </div>
          </div>
        );
      default:
        return <div>Выберите состояние</div>;
    }
  };

  return (
    <>
      {/* <Header /> */}
      {/* <div className="container"> */}
      <div className="container3">
        <div className="block1">
          <button
            className={formState === "state1" ? "activeButton" : "button"}
            onClick={() => handleStateChange("state1")}
          >
            Принтер
          </button>
          <button
            className={formState === "state2" ? "activeButton" : "button"}
            onClick={() => handleStateChange("state2")}
          >
            Extruder 1
          </button>
          <button
            className={formState === "state3" ? "activeButton" : "button"}
            onClick={() => handleStateChange("state3")}
          >
            Extruder 2
          </button>
        </div>
        {renderFormState()}
      </div>
      {/* </div> */}
    </>
  );
};

export default AddPrinter;
