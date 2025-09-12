#exercicio_aula_3

print("Pesquisador de carros On-line!")

car1 = input("\nInsiro o modelo do primeiro carro a ser verificado: ")
ida1 = int(input(f"\nDigite o Ano do {car1}: "))

car2 = input("\nInsiro o modelo do segundo carro a ser verificado: ")
ida2 = int(input(f"\nDigite o Ano de {car2}: "))

car3 = input("\nInsiro o modelo do terceiro carro a ser verificado: ")
ida3 = int(input(f"\nDigite o Ano de {car3}: "))


#comparativo
if ida1 < ida2 and ida1 < ida3:
    ida1 = 2025 - ida1
    print(f"\n\nO seu carro mais antigo é {car1} com {ida1} anos")
elif ida2 < ida3:
    ida2 = 2025 - ida2
    print(f"\n\nO seu carro mais antigo é {car2} com {ida2} anos")
else:
    ida3 = 2025 - ida3
print(f"\n\nO seu carro mais antigo é {car3} com {ida3} anos")