maisalto = ""
predio = 0.001 

for i in range(2):
    nome = input("\nNome do Amigo? : ")
    altura = float(input(f"\nInsira a altura de {nome} : "))

    # se for o primeiro valor ou se a altura for menor que o atual
    if altura > predio:
        maisalto = nome
        predio = altura

print(f"\n\nO mais alto é o {maisalto} medindo {predio}")
