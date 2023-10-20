export const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    const time = `${hours}:${minutes}:${seconds}`;

    return time;
}

export const getCurrentDate = () => {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    
    const formattedDate = `${day}.${month}.${year}.`;
    
    return formattedDate;
}

export const parseDateTime = (dateString, timeString) => {
    const [year, month, day] = dateString.split('.').map(Number);
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds).getTime();
};

export const calculatePercentage = (count, total) => { return (count / total) * 100 };

export const calculatePercentages = (data) => {
    let szent_istvan = 0;
    let autizmus_alapitvany = 0;
    let elemiszer_bankegysulet = 0;
    let lampas_92 = 0;
  
    if (data.length !== 0) {
      data.forEach((request) => {
        szent_istvan += parseInt(request.szent_istvan_kiraly_zenei_alapitvany);
        autizmus_alapitvany += parseInt(request.autizmus_alapitvany);
        elemiszer_bankegysulet += parseInt(request.elemiszer_bankegysulet);
        lampas_92 += parseInt(request.lampas_92_alapitvany);
      });
    }
  
    const allSweaters = data.length * 12;
  
    const percentages = {
      szent_istvan: calculatePercentage(szent_istvan, allSweaters),
      autizmus_alapitvany: calculatePercentage(autizmus_alapitvany, allSweaters),
      elemiszer_bankegysulet: calculatePercentage(elemiszer_bankegysulet, allSweaters),
      lampas_92: calculatePercentage(lampas_92, allSweaters),
    };
  
    return percentages;
};
