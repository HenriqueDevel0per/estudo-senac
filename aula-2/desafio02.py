print("Cadastro e calculo de funcionários\n\n\n")

cont = 3

while cont == 3 :
    nome = input("insira seu nome: ") 
    cpf = input("Insira seu CPF: ")
    sal_brt = float(input("Insira seu salário bruto : "))

    if sal_brt >= 1897.12:
        inss = sal_brt * 0.11
        cargo = "Acionista"

    elif sal_brt < 1897.12 and sal_brt >= 1500:
        inss = sal_brt * 0.09
        cargo= "Gerente" 

    elif sal_brt < 1500:
        inss = sal_brt * 0.08
        cargo = "Vendedor"

    if sal_brt >= 1500:
        vale = sal_brt * 0.06

    elif sal_brt < 1500:
        vale = sal_brt * 0.05

    sal_liq = sal_brt - (vale + inss)

    print("\nDados Funcionário\n")
    print(f"Nome: {nome}")
    print(f"Cargo: {cargo}")
    print(f"CPF: {cpf}")
    print(f"Salario bruto: R${sal_brt:.2f}")
    print(f"Desconto vale transporte: R${vale:.2f} ")
    print(f"Desconto INSS: R${inss:.2f}\n")
    print(f"Salario Liquido a Receber: R${sal_liq:.2f}\n\n")
