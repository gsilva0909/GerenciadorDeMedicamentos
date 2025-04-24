/**
 * Calcula a quantidade de água necessária por dia com base no peso corporal
 * e no tempo de atividade física.
 * 
 * @param {string} peso - Peso corporal em kg (como string para validação).
 * @param {string} tempoAtividade - Tempo de atividade física em horas (como string para validação).
 * @returns {number} - Quantidade total de água em ml.
 * @throws {Error} - Lança um erro se os valores forem inválidos.
 */
export function calcularAguaDiaria(peso, tempoAtividade) {
  // Converte o peso de string para número de ponto flutuante.
  const pesoEmKg = parseFloat(peso);

  // Converte o tempo de atividade de string para número de ponto flutuante.
  const horasAtividade = parseFloat(tempoAtividade);

  // Valida se o peso é um número válido e maior que zero.
  if (isNaN(pesoEmKg) || pesoEmKg <= 0) {
    throw new Error('Por favor, insira um peso válido.');
  }

  // Valida se o tempo de atividade é um número válido e não negativo (se fornecido).
  if (tempoAtividade && (isNaN(horasAtividade) || horasAtividade < 0)) {
    throw new Error('Por favor, insira um tempo de atividade válido.');
  }

  // Calcula a quantidade de água necessária com base no peso.
  const aguaPorPeso = pesoEmKg * 35; // 35 ml de água por kg de peso.

  // Calcula a quantidade de água adicional com base no tempo de atividade física.
  const aguaPorAtividade = (horasAtividade || 0) * 600; // 600 ml de água por hora de atividade.

  // Retorna a soma da água necessária pelo peso e pela atividade física.
  return aguaPorPeso + aguaPorAtividade;
}
