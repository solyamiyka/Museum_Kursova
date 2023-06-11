from flask import Flask, render_template, request, redirect, url_for
from email.mime.text import MIMEText
from email.header import Header
import smtplib
import sqlite3
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_here'


def gmail_sender(message, user):
    sender = 'skravatka@gmail.com'
    password = 'docqbxmuaelbfvrw'

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()

    # додано кодування символів
    message = message.encode('utf-8')

    # Створення об'єкту MIMEText з текстовим повідомленням
    msg = MIMEText(message, 'plain', 'utf-8')
    msg['To'] = user
    msg['From'] = sender
    msg['Subject'] = Header('Museum', 'utf-8')

    try:
        server.login(sender, password)
        server.sendmail(sender, user, msg.as_string())
        return "success"
    except Exception as _ex:
        return f"{_ex}\nERROR! ERROR! ERROR! ERROR!"


def get_db_connection():
    conn = sqlite3.connect('vystavky.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/vacancies', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        name_surname = request.form['nameSurname']
        email = request.form['email']
        message = f"Доброго дня, {name_surname}, наразі немає вільних вакансій. Дякуємо за зв'язок!"
        gmail_sender(message, email)
        return redirect(url_for('success'))
    else:
        return render_template('vacancies.html')

@app.route('/vacancies')
def success():
    return render_template('vacancies.html')


@app.route('/')
def main():
    return render_template('main.html')


@app.route('/vystavky', methods=['GET'])
def vystavky():
    search_query = request.args.get('search', '')  # Отримання значення з параметра 'search' у URL
    date_query = request.args.get('date')  # Отримання значення з параметра 'date' у URL

    conn = get_db_connection()
    cursor = conn.cursor()

    if date_query:
        try:
            date = datetime.strptime(date_query, '%Y-%m-%d').date()
            date_string = date.strftime('%Y-%m-%d')
            cursor.execute(
                "SELECT vyst_id, vyst_name, time_vys, photo_vys, date_chars FROM MainVyst JOIN PhotoVyst ON MainVyst.vyst_id = PhotoVyst.vys_id JOIN VystInfo ON MainVyst.vyst_id = VystInfo.vys_id WHERE ? BETWEEN start_date AND end_date",
                (date_string,))
        except ValueError:
            rows = []
            conn.close()
            return render_template('vystavky.html', rows=rows, search_query=search_query)

    else:
        cursor.execute(
            "SELECT vyst_id, vyst_name, time_vys, photo_vys, date_chars FROM MainVyst JOIN PhotoVyst ON MainVyst.vyst_id = PhotoVyst.vys_id JOIN VystInfo ON MainVyst.vyst_id = VystInfo.vys_id")

    rows = cursor.fetchall()
    conn.close()

    if search_query:
        rows = [row for row in rows if search_query.lower() in row['vyst_name'].lower()]

    return render_template('vystavky.html', rows=rows, search_query=search_query)


@app.route('/about/<button_id>', methods=['GET'])
def about(button_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT vyst_id, vyst_name, time_vys, photo_vys, date_chars, description_1, description_2 FROM MainVyst JOIN PhotoVyst ON MainVyst.vyst_id = PhotoVyst.vys_id JOIN VystInfo ON MainVyst.vyst_id = VystInfo.vys_id WHERE vyst_id=?",
        (button_id,))
    rows = cursor.fetchall()
    conn.close()

    return render_template('aboutV.html', button_id=button_id, rows=rows)


@app.route('/vacancies')
def vacancies():
    return render_template('vacancies.html')


@app.route('/plan')
def plan():
    return render_template('plan.html')


if __name__ == "__main__":
    app.run(debug=True)
