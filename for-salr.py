sumslr = 0

for i in range(4):
    nome = str(input("\n\nDigite o nome dos funcionários : "))
    slr = float(input(f"\n\nInsira o Salário de {nome} R$: "))
    sumslr += slr



print(f"\n\nA soma dos salários dos amigos é R${sumslr}")