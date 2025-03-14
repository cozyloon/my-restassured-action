# Use a base image with Maven and Java
FROM maven:3.9.6-eclipse-temurin-17

# Set working directory
WORKDIR /app

# Optimize apt cache and install dependencies
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Install Node.js for conversion
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g newman

# Install Allure for reporting
RUN curl -o allure-2.24.0.tgz -L https://github.com/allure-framework/allure2/releases/download/2.24.0/allure-2.24.0.tgz \
    && tar -xzf allure-2.24.0.tgz -C /usr/local/bin/ && rm allure-2.24.0.tgz

# Copy scripts and entrypoint
COPY scripts/ scripts/
COPY entrypoint.sh /entrypoint.sh

# Ensure script is executable
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
