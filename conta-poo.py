import random

class Conta:
    def __init__(self):
        self.nome = input("Insira seu nome: ")
        self.conta = input("Insira sua conta sem o dígito: ")
        self.cpf = input(f"Insira o seu CPF, {self.nome}: ")
        self.saldo = random.randint(0, 1000)  # saldo inicial aleatório

    def depositar(self,deposito_inicial, valor):
        deposito_inicial = float(input("Insira o valor a ser depositado: "))
        self.depositar(deposito_inicial)  # usa o método para depositar
        if valor > 0:
            self.saldo += valor
            print(f"Depósito de R${valor:.2f} realizado com sucesso!")
        else:
            print("Valor de depósito inválido!")

    def ver_saldo(self):
        print(f"{self.nome}, seu saldo atual é de R${self.saldo:.2f}")