const downloadCSV = async (item, fileName) => {
  let parsedData = [];
  parsedData = await readCSV(`output/${fileName}.csv`);
  if (!!parsedData) {
    parsedData.push({
      STT: parsedData.length + 1,
      ...item,
    });
  } else {
    parsedData = [
      {
        STT: 1,
        ...item,
      },
    ];
  }
  console.log("parsedData", parsedData, fileName);
  let dataConverter = convert2CSV(parsedData);
  console.log(dataConverter);
  //download
  if (!dataConverter) return;

  const filename = `${fileName}.csv`;

  if (!dataConverter.match(/^data:text\/csv/i)) {
    dataConverter = "data:text/csv;charset=utf-8," + dataConverter;
  }

  const data = encodeURI(dataConverter);

  const link = document.createElement("a");
  link.setAttribute("href", data);
  link.setAttribute("download", filename);
  link.click();
};

const readCSV = (filePath) => {
  return new Promise((resolve) => {
    Papa.parse(filePath, {
      header: true,
      download: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function (results) {
        resolve(results.data);
      },
      error: function (results) {
        resolve(false);
      },
    });
  });
};

const convert2CSV = (data) => {
  return Papa.unparse(data);
};
