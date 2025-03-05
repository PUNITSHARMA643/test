from pyspark.sql import SparkSession

# Create a Spark session
spark = SparkSession.builder \
    .appName("DataProcessingApp") \
    .master("local[*]") \
    .config("spark.mongodb.input.uri", "mongodb+srv://punitsharma8315:PAFTkMGv3FIezXaG@cluster0.l9bpd.mongodb.net/yourdb.yourcollection") \
    .config("spark.mongodb.output.uri", "mongodb+srv://punitsharma8315:PAFTkMGv3FIezXaG@cluster0.l9bpd.mongodb.net/yourdb.yourcollection") \
    .getOrCreate()

# Load data from MongoDB
df = spark.read.format("mongo").load()

# Perform data processing
df_filtered = df.filter(df["column"] > 100)
df_grouped = df_filtered.groupBy("column").count()

# Show the results
df_grouped.show()