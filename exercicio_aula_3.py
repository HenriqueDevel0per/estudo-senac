#exercicio_aula_3

print("Pesquisador de valor carros On-line!")

car1 = input("Insiro o modelo do primeiro carro a ser verificado: ")
vlr1 = float (50000)

car2 = input("Insiro o modelo do segundo carro a ser verificado: ")
vlr2 = float(100000)

car3 = input("Insiro o modelo do terceiro carro a ser verificado: ")
vlr3 = float (90000)


#comparativo
if vlr1 >= vlr2 and vlr1 >= vlr3:
    carcaro = car1
    cust = vlr1
elif vlr2 >= vlr3:
    carcaro = car2
    cust = vlr2
else:
    carcaro = car3
    cust = vlr3

print(f"\nO seu carro mais caro é {carcaro} custando R$ {cust}")
