num1 = int(input("\n\nInsira o numero: "))

if num1 > 20:
    print(f"\n\n{num1} será somado 10 \n\n")
    num1 = num1 + 10
    print(f"O resultado é : {num1}")
elif num1 <= 20:
    print(f"{num1} será subtraido de 10\n\n")
    num1  = num1 - 10
    print(f"O resultado é : {num1}")