import concurrent.futures
import glob
import gzip

import ujson
import datetime

import os
import psycopg2
import traceback


def connect():
    return psycopg2.connect(database='evcard', user='derekhe', password='', host='localhost', port='5432')


def get_table_name(file):
    return datetime.datetime.strptime(os.path.basename(file)[0:15] + "+0800", "%Y%m%d-%H%M%S%z").strftime(
        "sharecar_%Y%m%d")


def create_table(file):
    with connect() as cnx:
        with cnx.cursor() as cursor:
            cursor.execute('''create table if not EXISTS %s
            (
                plate_num text not null,
                position point not null,
                battery smallint not null,
                name text not null,
                seats smallint not null,
                parking_name text not null,
                time timestamp with time zone not null
            )''' % get_table_name(file))


def import_file(file):
    try:
        with connect() as cnx:
            with gzip.open(file, 'rt') as f:
                print(file)
                crawl_date = datetime.datetime.strptime(os.path.basename(file)[0:15] + "+0800", "%Y%m%d-%H%M%S%z")
                text = f.read()
                parkings = ujson.loads(text)['details']

                table_name = get_table_name(file)

                with cnx.cursor() as cursor:
                    for park in parkings:
                        if park['status'] != 0:
                            continue

                        dataList = park['dataList']

                        if dataList is None:
                            continue

                        for c in dataList:
                            cursor.execute(
                                'INSERT INTO ' + table_name + '       (plate_num, position,     battery, name, seats, parking_name, time) '
                                                              'VALUES (%s,        POINT(%s, %s), %s,       %s, %s,        %s,     to_timestamp(%s))',
                                (c['vehicleNo'], c['longitude'] / 1000000, c['latitude'] / 1000000, c['soc'],
                                 c['vehicleModelName'], c['approvedSeats'], c['shopName'],
                                 crawl_date.timestamp()))

    except Exception as ex:
        print(file)
        traceback.print_exc()


executor = concurrent.futures.ProcessPoolExecutor(max_workers=16)

for file in sorted(glob.glob("/media/derekhe/storage/sharecar/db/evcard/*/**")):
    create_table(file)
    executor.submit(import_file, file)

executor.shutdown()
