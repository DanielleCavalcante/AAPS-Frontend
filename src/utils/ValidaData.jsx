export function ValidarData(dateString) {
  if (!dateString) return false; // Se não tiver valor, não considera como futura
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Zera horas para comparar só datas
  const inputDate = new Date(dateString);
  return inputDate > today;
}
