# Use the official Python image from Docker Hub
FROM python:3.13.0-slim


# Copy the requirements file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Set environment variables (optional)
ENV PYTHONUNBUFFERED=1

# Command to run the application (adjust as needed)
CMD ["python", "main.py"]
