def colabs(sal):
    sal = sal * 1.10
    print(f"\n\n\nO novo salario de {nome} é de R$",sal)
    return

for x in range(5):
    nome = input("\n\nInsira o nome do colaborador : ")
    salr = float(input(f"\n\nInsira o salário de {nome} : "))
    colabs(salr)