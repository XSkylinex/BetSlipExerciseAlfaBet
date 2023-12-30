import BatterySign from "../../../assets/phoneBar/svg/Battery.svg";
import CellularSign from "../../../assets/phoneBar/svg/cellularConnection.svg";
import WifiSign from "../../../assets/phoneBar/svg/Wifi.svg";

interface IMobileSignsList {
  id: number;
  name: string;
  icon: string;
}

export const mobileSignsList: IMobileSignsList[] = [
  {
    id: 1,
    name: "Cellular",
    icon: CellularSign,
  },
  {
    id: 2,
    name: "Wifi",
    icon: WifiSign,
  },
  {
    id: 3,
    name: "Battery",
    icon: BatterySign,
  },
];
