import random

class ContaBancaria:

    def __init__(self, nome_titular, cpf_titular):
        self.nome = nome_titular
        self.cpf = cpf_titular
        self.saldo = random.uniform(0, 25000.00) 
        print(f"Olá {self.nome}, Seu saldo atual é R$ {self.saldo:.2f}")

    def depositar(self, valor_deposito):
        if valor_deposito > 0:
            self.saldo += valor_deposito
            print(f"Depósito de R$ {valor_deposito:.2f} realizado com sucesso.")
            self.consultar_saldo()
        else:
            print("Valor de depósito inválido. Por favor, insira um número positivo.")
            
    def consultar_saldo(self):
        print(f"Seu saldo atual é: R$ {self.saldo:.2f}")


print("--- Bem-vindo ao OliverBank!'. ---")
nome_cliente = input("Digite seu nome completo: ")
cpf_cliente = input("Digite seu CPF: ")


cliente = ContaBancaria(nome_titular=nome_cliente, cpf_titular=cpf_cliente)

print("\n--- Operações Disponíveis ---")


while True:
    print("\nO que você deseja fazer?")
    print("(1) - Depositar")
    print("(2) - Consultar Saldo")
    print("(3) - Sair do Sistema")
    
    opcao = input("Escolha uma opção: ")

    if opcao == '1':
        try:
            valor = float(input("Qual valor deseja depositar? "))
            cliente.depositar(valor)
        except ValueError:
            print("Erro: Por favor, digite um número válido.")

    elif opcao == '2':
        cliente.consultar_saldo()

    elif opcao == '3':
        print(f"Obrigado por usar nosso sistema, {cliente.nome}!")
        break

    else:
        print("Opção inválida. Tente novamente.")