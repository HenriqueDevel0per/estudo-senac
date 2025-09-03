import random

class Conta:
    def __init__(self):
        self.nome = input("Insira seu nome: ")
        self.conta = input("Insira sua conta sem o dígito: ")
        self.cpf = input(f"Insira o seu CPF, {self.nome}: ")
        self.saldo = random.randint(0, 1000)  # saldo inicial aleatório

    def depositar(self):
        valor = float(input("Insira o valor a ser depositado: "))
        if valor > 0:
            self.saldo += valor
            print(f"Depósito de R${valor:.2f} realizado com sucesso!")
        else:
            print("Valor de depósito inválido!")

    def ver_saldo(self):
        print(f"{self.nome}, seu saldo atual é de R${self.saldo:.2f}")

# Programa principal
operar = Conta()      # já pede nome, conta e CPF
operar.ver_saldo()    # mostra o saldo inicial

operar.depositar()    # adiciona mais dinheiro
operar.ver_saldo()    # mostra saldo atualizado
