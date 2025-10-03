nome = input("insira seu nome: ") 
sal_brt = float(input("Insira seu salário bruto : "))
cpf = input("Insira seu CPF: ")

if sal_brt >= 1897.12:
    inss = sal_brt * 0.11
    cargo = "Acionista"

elif sal_brt < 1897.12 and sal_brt >= 1500:
    inss = sal_brt * 0.09
    cargo= "Gerente" 

elif sal_brt < 1500:
    inss = sal_brt * 0.08
    cargo = "Vendedor"

else:
    print("Opção invalida")

if sal_brt >= 1500:
    vale = sal_brt * 0.06

elif sal_brt < 1500:
    vale = sal_brt * 0.05

sal_liq = sal_brt - (vale + inss)

print(f"O {nome} de Cargo:{cargo} Salario Liquido: R$ {sal_liq} : Desconto Vale R$ {vale} Desconto INSS: R$ {inss}")