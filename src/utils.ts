import ExcelJS from "exceljs";

export const generateExcelFile = (tableData: any[], sheetName?: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName ?? "Sheet");

  const headers = Object.keys(tableData[0]);
  worksheet.addRow(headers);

  tableData.forEach((row) => {
    const rowData = Object.values(row);
    worksheet.addRow(rowData);
  });

  return workbook.xlsx.writeBuffer();
};

export const query = async (
  url: string,
  data?: any,
  method?: RequestInit["method"]
): Promise<any> => {
  let res = null;

  const params: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    params.body = JSON.stringify({
      ...data,
    });
  }

  await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`, params)
    .then((response) => response.json())
    .then((data) => (res = data))
    .catch((error) => console.error(error));

  return res;
};
