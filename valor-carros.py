for i in range (2):
    model = input("\n\n\nInsira o modelo do carro a ser avaliado: ")
    fabrc = int(input(f"\nInsira o ano de fabricação do {model} :"))
    value = float(input(f"\ninsira o Valor de {model} : "))
    if fabrc < 2010:
        newvalue = value * 1.10
    elif fabrc <= 2020:
        newvalue = value * 1.20
    else:
        newvalue = value * 1.30

    print(f"\n\no {model} passou de R${value} para {newvalue}")


