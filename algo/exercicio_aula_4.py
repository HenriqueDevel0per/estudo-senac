merc1 = str(input("Insira o nome do primeiro Mercado: "))
precafe1 = float(input(f"Insira o preço do café no {merc1} : "))

print("\n")

merc2 = str(input("Insira o nome do segundo Mercado: "))
precafe2 = float(input(f"Insira o preço do café no {merc2} : "))

print("\n")

merc3 = str(input("Insira o nome do terceiro Mercado: "))
precafe3 = float(input(f"Insira o preço do café no {merc3} : "))

print("\n\n")

#processamento
if precafe1 <= precafe2 and precafe1 <= precafe3:
    print(f"\nO Café mais barato está no {merc1}, custando R$ {precafe1}")
elif precafe2 <= precafe3:
    print(f"\nO Café mais barato está no {merc2}, custando R$ {precafe2}")
else:
   print(f"\nO Café mais barato está no {merc3}, custando R$ {precafe3}")