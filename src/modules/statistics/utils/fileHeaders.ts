export const getFileHeaders = (format: string) => {
  if (format === "csv") {
    return {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="statistics.csv"`,
    };
  }

  return {
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": `attachment; filename="statistics.xlsx"`,
  };
};
