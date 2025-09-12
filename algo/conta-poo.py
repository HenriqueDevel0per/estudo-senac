import random

class Conta:
    def __init__(self):
        self.nome = input("Insira seu nome: ")
        self.conta = input("Insira sua conta sem o dígito: ")
        self.cpf = input(f"Insira o seu CPF, {self.nome}: ")
        self.saldo = random.randint(0, 10000)  # saldo inicial aleatório

    def depositar(self):
        deposito = input("Deseja Depositar algum valor? S - Sim / N - Não: ").upper()
        if deposito == "S":
            val_dep = float(input("Qual valor a ser depositado? : "))
        else:
            ()
        if val_dep > 0:
            self.saldo += val_dep
            print(f"Depósito de R${val_dep:.2f} realizado com sucesso!")
        else:
            print("Valor de depósito inválido!")

    def sacar(self):
        saque = input("Deseja realizar um saque? S - Sim / N - Não: ").upper()
        if saque == "S":
            val_saque = float(input("Qual valor a ser sacado ? : "))
        else:
            ()
        val_saque = 0
        if self.saldo <= val_saque:
            val_saque = float(input("Qual valor a ser sacado ? : "))
            self.saldo -= val_saque
            print(f"Saque de R${val_saque:.2f} realizado com sucesso!")
        else:
            print("Saldo Insuficiente!")

    def ver_saldo(self):
        print(f"{self.nome}, seu saldo atual é de R${self.saldo:.2f}")

# Programa principal
operar = Conta()      # já pede nome, conta e CPF
operar.ver_saldo()    # mostra o saldo inicial
operar.sacar()        # Retira o dinheiro
operar.depositar()    # adiciona mais dinheiro
operar.ver_saldo()    # mostra saldo atualizado