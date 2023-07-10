const selectSchoolYear = document.getElementById("schoolYear");
const currentYear = new Date().getFullYear();

for (let i = 0; i < 30; i++) {
  const startYear = currentYear - i;
  const endYear = startYear + 1;
  const schoolYear = `${startYear}-${endYear}`;

  const option = document.createElement("option");
  option.value = schoolYear;
  option.text = schoolYear;
  selectSchoolYear.appendChild(option);
}