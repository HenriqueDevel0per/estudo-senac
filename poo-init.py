class Carros:
    def __init__(self):
        self.modelo = input("Insira o modelo do carro: ")
        self.ano = int(input(f"Ano de fabricação do {self.modelo}: "))

    def printar(self):
        self.ano = 2025 - self.ano
        print(f"O {self.modelo} tem {self.ano}anos.")

car1 = Carros()
car1.printar()