totpoodle = 0
contador = "S"

print("\n\n\n")

while contador == "S":
    dograca = input("\n\nRaça do seu cachorro: ").upper()
    if dograca == "POODLE":
        totpoodle += 1
    contador = input("\n\nDeseja continuar contabilizando? S / N : ").upper()

print(f"\n\nO total de dooguinhos da raça poodle é {totpoodle} ")