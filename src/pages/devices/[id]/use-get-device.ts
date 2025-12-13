import { useEffect, useState } from "react";
import toml from "toml";
import type { DeviceConfig } from "./device";

export function useGetDeviceById(id: string) {
  const [device, setDevice] = useState<DeviceConfig | null>(null);

  useEffect(() => {
    fetch("/devices.toml")
      .then((res) => res.text())
      .then((text) => {
        const parsed = toml.parse(text);
        const foundDevice = parsed.device.find(
          (d: DeviceConfig) => d.id === id
        );
        if (foundDevice) {
          setDevice(foundDevice);
        }
      })
      .catch((error) => {
        console.error("Error loading devices:", error);
      });
  }, [id]);
  return device;
}

export function useGetAllDevices() {
  const [devices, setDevices] = useState<DeviceConfig[]>([]);

  useEffect(() => {
    fetch("/devices.toml")
      .then((res) => res.text())
      .then((text) => {
        setDevices(toml.parse(text).device);
      })
      .catch((error) => {
        console.error("Error loading devices:", error);
      });
  }, []);
  return devices;
}
