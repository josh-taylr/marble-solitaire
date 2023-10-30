import { type ReportHandler } from "web-vitals";

const reportWebVitals = async (onPerfEntry?: ReportHandler): Promise<void> => {
  if (onPerfEntry != null && onPerfEntry instanceof Function) {
    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import(
        "web-vitals"
      );
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    } catch (error) {
      console.error(error);
    }
  }
};

export default reportWebVitals;
