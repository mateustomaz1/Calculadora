import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const botoes = [
  ['C', '+/-', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function App() {
  const [valorAtual, setValorAtual] = useState('0');
  const [valorAnterior, setValorAnterior] = useState(null);
  const [operador, setOperador] = useState(null);

  const limpar = () => {
    setValorAtual('0');
    setValorAnterior(null);
    setOperador(null);
  };

  const adicionarNumero = (num) => {
    setValorAtual((prev) =>
      prev === '0' || prev === 'Erro' ? num : prev + num
    );
  };

  const inverterSinal = () => {
    if (valorAtual === '0') return;
    setValorAtual((prev) =>
      prev.charAt(0) === '-' ? prev.slice(1) : '-' + prev
    );
  };

  const porcentagem = () => {
    setValorAtual((parseFloat(valorAtual) / 100).toString());
  };

  const selecionarOperador = (op) => {
    setOperador(op);
    setValorAnterior(valorAtual);
    setValorAtual('0');
  };

  const calcular = () => {
    if (!operador || valorAnterior == null) return;

    const a = parseFloat(valorAnterior);
    const b = parseFloat(valorAtual);
    let resultado = 0;

    switch (operador) {
      case '+':
        resultado = a + b;
        break;
      case '-':
        resultado = a - b;
        break;
      case '×':
        resultado = a * b;
        break;
      case '÷':
        resultado = b !== 0 ? a / b : 'Erro';
        break;
    }

    setValorAtual(resultado.toString());
    setValorAnterior(null);
    setOperador(null);
  };

  const lidarComPressao = (valor) => {
    if (!isNaN(valor)) {
      adicionarNumero(valor);
    } else if (valor === 'C') {
      limpar();
    } else if (valor === '+/-') {
      inverterSinal();
    } else if (valor === '%') {
      porcentagem();
    } else if (valor === '=') {
      calcular();
    } else {
      selecionarOperador(valor);
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.visor}>
        <Text style={estilos.textoVisor} numberOfLines={1}>
          {valorAtual}
        </Text>
      </View>

      {botoes.map((linha, i) => (
        <View key={i} style={estilos.linhaBotoes}>
          {linha.map((rotulo, j) => {
            const ehZero = rotulo === '0';
            const ehOperador = ['÷', '×', '-', '+', '='].includes(rotulo);
            const ehFuncional = ['C', '+/-', '%'].includes(rotulo);

            return (
              <TouchableOpacity
                key={j}
                style={[
                  estilos.botao,
                  ehZero && estilos.botaoZero,
                  ehOperador && estilos.botaoOperador,
                  ehFuncional && estilos.botaoFuncional,
                ]}
                onPress={() => lidarComPressao(rotulo)}
              >
                <Text
                  style={[
                    estilos.textoBotao,
                    (ehOperador || ehFuncional) && estilos.textoEscuro,
                  ]}
                >
                  {rotulo}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const tela = Dimensions.get('window');
const tamanhoBotao = tela.width / 5;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  visor: {
    minHeight: 150,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#000',
  },
  textoVisor: {
    color: '#fff',
    fontSize: 80,
    fontWeight: '200',
  },
  linhaBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 10,
    marginBottom: 10,

  },
  botao: {
    backgroundColor: '#333',
    width: tamanhoBotao,
    height: tamanhoBotao,
    borderRadius: tamanhoBotao / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoZero: {
    width: tamanhoBotao * 2 + 10,
    alignItems: 'flex-start',
    paddingLeft: 30,
    borderRadius: tamanhoBotao,
  },
  botaoOperador: {
    backgroundColor: '#f09a36',
  },
  botaoFuncional: {
    backgroundColor: '#a5a5a5',
  },
  textoBotao: {
    fontSize: 30,
    color: '#fff',
  },
  textoEscuro: {
    color: '#000',
  },
});
