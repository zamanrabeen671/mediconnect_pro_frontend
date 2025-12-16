export function capitalizeFirstLetter(str: string) {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1);
  }


  export const formatCurrency = (value: number): string => {
    return `৳${value.toLocaleString()}`;
  };


  export const convertToCSVReport = (json: any) => {
    if (!json || (Array.isArray(json) && json.length === 0)) return "";
    const dataArray = Array.isArray(json) ? json : [json];
        const headers = Object.keys(dataArray[0]).join(",");
        const rows = dataArray.map((obj) =>
        Object.values(obj)
            .map((value) => (value !== undefined ? `"${value}"` : '""'))
            .join(",")
    );

    return [headers, ...rows].join("\n");
};

export const convertToCSV = (json: any) => {
  if (!json.length) return "";

  const headers = Object.keys(json[0]).join(","); // Extract headers
  const rows = json.map((obj: any) =>
    Object.values(obj)
      .map((value) => `"${value}"`)
      .join(",")
  ); // Convert rows

  return [headers, ...rows].join("\n"); // Join all
};