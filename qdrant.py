import pdfplumber
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams, PointStruct

qdrant_client = QdrantClient(
    url="https://f3e344ac-62b2-4827-8507-e9db88a76c45.us-east4-0.gcp.cloud.qdrant.io:6333", 
    api_key="",
)

input_text = "service"

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')



# 提取 PDF 文档中的文本
def extract_text_from_pdf(pdf_path):
    text_contents = []  # 用于存储每一页的文本

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text_contents.append(page.extract_text())

    return text_contents

# 将文本向量化
def embed_text(text):
    vector = model.encode([text])[0]
    return vector

# PDF 文件路径
pdf_path = "pdf/PSS_design2-YC.pdf"

# 提取文本内容
text_content = extract_text_from_pdf(pdf_path)

collection_name="collection",

# qdrant_client.create_collection(
#     collection_name,
#     vectors_config=VectorParams(size=384, distance=Distance.DOT),
# )collection_name = "('collection',)"

# 使用 count 操作获取记录数量
count_result = qdrant_client.count("('collection',)")

print(f"Number of records in collection {collection_name}: {count_result.count}")

input_texts = text_content

# 为每个文本生成向量并插入 Qdrant
for idx, input_text in enumerate(input_texts, start=count_result.count+1):
    vector = embed_text(input_text)
    
    # 将文本信息放入 payload 中
    payload_data = {"text": input_text}

    operation_info = qdrant_client.upsert(
        collection_name="('collection',)",
        wait=True,
        points=[
            PointStruct(id=idx, vector=vector, payload=payload_data),
        ],
    )

    print(f"Inserting vector for text '{input_text}' with ID {idx}. Operation info: {operation_info}")

# 使用 embed_text 函数获得向量
vector = embed_text(input_text)

search_result = qdrant_client.search(
    collection_name="('collection',)", query_vector=vector, limit=5,
    with_vectors=True,
    with_payload=True,
)

sorted_result = sorted(search_result, key=lambda x: x.id)
response = ''
for i in sorted_result:
    print(i.payload['text'])
    response = response + i.payload['text']
print('*****',response)


