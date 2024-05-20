export function Duration(timeStart: string, timeEnd: string): number {
  const lemburStart = new Date(`2022-01-01T${timeStart}`);
  const lemburEnd = new Date(`2022-01-01T${timeEnd}`);
  const jamMulaiLembur = 9; // jam dimulai lembur
  const jamSelesaiLembur = 17; // jam selesai lembur
  let durasiLembur = Math.max(
    0,
    lemburEnd.getHours() -
      lemburStart.getHours() -
      (jamSelesaiLembur - jamMulaiLembur)
  );

  // Jika durasi lembur kurang dari 1 jam, set durasi menjadi 0 jam
  if (durasiLembur < 1) {
    durasiLembur = 0;
  }

  return durasiLembur;
}
