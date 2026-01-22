import bcrypt
import bcrypt
import csv
import os

CSV_FILE="users.csv"

def init_csv():
    if not os.path.exists(CSV_FILE):
        with open(CSV_FILE,"w",newline="") as file:
            writer=csv.writer(file)
            writer.writerow(["email", "password"])
    print (os.listdir())

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def search_user(email:str):
    with open(CSV_FILE, newline="") as file:
        reader=csv.DictReader(file)
        for rec in reader:
            if rec["email"]==email:
                return rec
    return None

def check_password(n_password,o_password)->bool:
    return bcrypt.checkpw(n_password.encode(),o_password.encode())

def save_user(email:str,password:str):
    hashed_password=hash_password(password)

    with open(CSV_FILE,"a",newline="") as file:
        writer=csv.writer(file)
        writer.writerow([email,hashed_password])


# if __name__=='__main__':
#     init_csv()
#     save_user("test","test")
#     print(search_user("test"))
#     print(check_password('test','$2b$12$hHkLtVKASHaA/yw2bfmkgerh7iqWR2I1qRR2rYNV1peBEAKoldOJS'))