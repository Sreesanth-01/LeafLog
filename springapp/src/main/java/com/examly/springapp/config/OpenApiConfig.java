package com.examly.springapp.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI plantCareOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Plant Care API")
                        .description("REST API for managing plants and generating plant care plans.")
                        .version("1.0.0"));
    }
}