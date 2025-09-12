'''nomes = []
for y in range(5):
    nome = input("Digite um nome: ")
    nomes.append(nome)

nomes.sort()

print("Nomes em Ordem: ")
for z in range (5):
    print(nomes [z])'''

# Correção do exercício 1
def obter_nomes():
    nomes = []
    print("Digite 10 nomes:")
    for i in range(10):
        nome = input(f"º{i+1} Nome : ")
        nomes.append(nome)
    return nomes

def exibir_nomes(nomes, mensagem):
    print("\n" + mensagem)
    for nome in nomes:
        print(nome)

def ordenar_nomes(nomes):
    nomes_ordenados = sorted(nomes)  # Retorna uma nova lista ordenada
    return nomes_ordenados

# Programa principal
#if __name__ == "__main__":
lista_nomes = obter_nomes()
exibir_nomes(lista_nomes, "Nomes na ordem em que foram inseridos:")
    
lista_nomes_ordenados = ordenar_nomes(lista_nomes)
exibir_nomes(lista_nomes_ordenados, "Nomes em ordem alfabética:")