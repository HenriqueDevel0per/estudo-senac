maiorsalario = 0
rico = ""
contador = "S"

print("\n\n\n")

while contador == "S":
    nome = input("\n\nInsira seu nome: ")
    salario = float(input(f"\n\n{nome} Insira seu salário: "))
    if salario > maiorsalario:
        maiorsalario = salario
        rico = nome
    contador = input("\n\nDeseja continuar contabilizando? S / N : ").upper()

print(f"\n\n {rico} Tem o maior salário R${maiorsalario}")