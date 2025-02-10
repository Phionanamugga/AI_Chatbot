import torch

MODEL_NAME = "distilgpt2"
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
