import React, { useState } from 'react'; // Importa o React e o hook useState para gerenciar estados.
import { View, Text, TextInput, Button, StyleSheet, Keyboard } from 'react-native'; // Importa componentes básicos do React Native.
import { calcularAguaDiaria } from './services/calculoAgua'; // Importa a função de cálculo de água do arquivo de serviços.

export default function App() {
  // Estados para armazenar os valores de peso, tempo de atividade e o resultado do cálculo.
  const [peso, setPeso] = useState(''); // Armazena o peso digitado pelo usuário.
  const [tempoAtividade, setTempoAtividade] = useState(''); // Armazena o tempo de atividade física digitado pelo usuário.
  const [resultado, setResultado] = useState(null); // Armazena o resultado do cálculo.

  // Função chamada ao pressionar o botão "Calcular".
  const calcularAgua = () => {
    try {
      Keyboard.dismiss(); // Fecha o teclado ativo.
      const totalAgua = calcularAguaDiaria(peso, tempoAtividade); // Chama a função de cálculo passando os valores de peso e tempo.
      setResultado(totalAgua.toFixed(2)); // Define o resultado com 2 casas decimais.
    } catch (error) {
      alert(error.message); // Exibe uma mensagem de erro caso os valores sejam inválidos.
    }
  };

  return (
    <View style={styles.container}>
      {/* Campo de entrada para o peso */}
      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput
        style={styles.input} // Estilo aplicado ao campo de entrada.
        keyboardType="numeric" // Define o teclado numérico para entrada.
        value={peso} // Valor atual do estado "peso".
        onChangeText={setPeso} // Atualiza o estado "peso" ao digitar.
        placeholder="Digite seu peso" // Texto de placeholder exibido no campo.
      />

      {/* Campo de entrada para o tempo de atividade física */}
      <Text style={styles.label}>Tempo de Atividade Física (horas):</Text>
      <TextInput
        style={styles.input} // Estilo aplicado ao campo de entrada.
        keyboardType="numeric" // Define o teclado numérico para entrada.
        value={tempoAtividade} // Valor atual do estado "tempoAtividade".
        onChangeText={setTempoAtividade} // Atualiza o estado "tempoAtividade" ao digitar.
        placeholder="Digite o tempo de atividade" // Texto de placeholder exibido no campo.
      />

      {/* Botão para calcular a quantidade de água */}
      <Button
        title="Calcular" // Texto exibido no botão.
        onPress={calcularAgua} // Função chamada ao pressionar o botão.
        color="#87CEEB" // Cor do botão.
      />

      {/* Exibição do resultado, caso exista */}
      {resultado && (
        <Text style={styles.resultado}>
          Você deve beber {resultado} ml de água por dia.
        </Text>
      )}
    </View>
  );
}

// Estilos aplicados aos componentes da interface.
const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz o container ocupar toda a tela.
    justifyContent: 'center', // Centraliza os elementos verticalmente.
    padding: 40, // Adiciona espaçamento interno.
    backgroundColor: '#FFF', // Define a cor de fundo como branco.
  },
  label: {
    fontSize: 18, // Tamanho da fonte do texto.
    marginBottom: 8, // Espaçamento abaixo do texto.
  },
  input: {
    borderWidth: 1, // Largura da borda do campo.
    borderColor: '#ccc', // Cor da borda.
    borderRadius: 10, // Arredondamento dos cantos do campo.
    padding: 10, // Espaçamento interno do campo.
    marginBottom: 20, // Espaçamento abaixo do campo.
    fontSize: 16, // Tamanho da fonte do texto digitado.
  },
  resultado: {
    marginTop: 20, // Espaçamento acima do texto do resultado.
    fontSize: 18, // Tamanho da fonte do texto do resultado.
    fontWeight: 'bold', // Deixa o texto em negrito.
    color: '#333', // Cor do texto.
  },
});
