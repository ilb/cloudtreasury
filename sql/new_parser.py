# This parser removes data from the Stock table, parses the new data and puts the data in the table
# Этот парсер удаляет данные из таблицы Stock, парсит новые данные и помещает данные в таблицу

import requests as req
import pandas as pd
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
import psycopg2

load_dotenv(os.path.join(os.path.dirname(os.getcwd()), '.env'))


def delte_all_data():
    conn = psycopg2.connect(os.environ.get('DATABASE_URL'))
    сur = conn.cursor()
    сur.execute('DELETE FROM "Stock"')
    conn.commit()

    print('Данные в таблице Stock удалены')

    сur.close()
    conn.close()

def get_request_text():
    URL = 'https://ilb.github.io/stockvaluation/securities.xhtml'
    resp_res = req.get(URL)
    resp_res.encoding = 'utf-8'
    return resp_res.text

delte_all_data()


df = pd.read_html(get_request_text(), header=0)[0]
df.columns = ['ticker', 'value', 'isin']

engine = create_engine(os.environ.get('DATABASE_URL'))
sql = df.to_sql('Stock', engine, index=False, if_exists='append')
print(str(sql) + ' записей было добавлено')