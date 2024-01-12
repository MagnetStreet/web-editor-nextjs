import { useEffect, useState } from 'react';

interface DeviceType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const useScreenSize = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  const determineDeviceType = () => {
    const { innerWidth } = window;

    setDeviceType({
      isMobile: innerWidth < 640,
      isTablet: innerWidth >= 640 && innerWidth < 1024,
      isDesktop: innerWidth >= 1024,
    });
  };

  useEffect(() => {
    determineDeviceType();

    const handleResize = () => {
      determineDeviceType();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
};

export default useScreenSize;
