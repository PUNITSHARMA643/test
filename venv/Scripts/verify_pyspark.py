from pyspark.sql import SparkSession

spark = SparkSession.builder \
    .appName("VerifyPySpark") \
    .getOrCreate()

print(spark.version)