import { useAppContext } from "@/context/AuthContext";
import Papa from "papaparse";

const DownloadCSV = () => {
  const { events } = useAppContext();

  const downloadCSV = () => {
    if (!events || Object.keys(events).length === 0) {
      alert("No events available to download.");
      return;
    }

    // Prepare data for CSV
    const csvData = [];
    for (const [date, eventList] of Object.entries(events)) {
      eventList.forEach((event) => {
        csvData.push({
          Date: date,
          Event: event.name,
          Category: event.category,
        });
      });
    }

    // Convert to CSV string
    const csv = Papa.unparse(csvData);

    // Create a blob and trigger download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "events.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={downloadCSV}
      className="px-4 py-2 bg-blue-700 text-white rounded-lg"
    >
      Download Events as CSV File
    </button>
  );
};

export default DownloadCSV;
