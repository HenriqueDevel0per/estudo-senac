nome = input("insira seu nome: ") 
sal_brt = float(input("Insira seu salário bruto : "))
cpf = input("Insira seu CPF")
inss = 0
vale = 0
sal_liq = 0


if sal_brt >= 1897.50:
    sal_brt = sal_brt * 0.10
    sal_liq = sal_brt 
    print(f"{sal_brt}")

 