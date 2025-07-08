// ✅ 사용 플러그인 정의
plugins {
	java // 자바 프로젝트로 설정 (필수)
	id("org.springframework.boot") version "3.2.5" // Spring Boot 플러그인 (앱 실행 및 패키징 지원)
	id("io.spring.dependency-management") version "1.1.4" // BOM 기반 의존성 버전 일괄 관리
}

group = "com.hwv1"                   // 프로젝트 패키지 네임 기반 그룹명 (예: com.hwv1.todo)
version = "0.0.1-SNAPSHOT"           // 현재 버전 (스냅샷은 개발중 의미)

// ✅ Java Toolchain 설정: 빌드시 사용할 Java 버전 명시 (17 사용)
java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

// ✅ 컴파일 전용 의존성 설정
// - annotationProcessor 의존성(lombok 등)을 compileOnly에도 적용
configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

// ✅ 외부 라이브러리를 다운로드할 저장소 지정
repositories {
	mavenCentral() // 가장 일반적인 공개 저장소
}

// ✅ 프로젝트에서 사용할 라이브러리 정의
dependencies {
	// 핵심 Spring 기능들
	implementation("org.springframework.boot:spring-boot-starter-data-jpa") // JPA (Hibernate 포함) + 트랜잭션 등
	implementation("org.springframework.boot:spring-boot-starter-web")      // Web MVC, REST API, 내장 Tomcat
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.5.0") // openapi
	implementation("org.hibernate.validator:hibernate-validator")

	// Spring Security (기본 인증 및 인가)
	implementation("org.springframework.boot:spring-boot-starter-security")

	// JJWT - JSON Web Token (토큰 생성/파싱용)
//	implementation("io.jsonwebtoken:jjwt-api:0.11.5")
//	runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
//	runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5") // jackson 사용 시 필수

	// auth0 - jwt
	implementation("com.auth0:java-jwt:4.4.0")

	// PasswordEncoder (Spring Boot 3 이상이면 자동 포함되지만 명시 가능)
	implementation("org.springframework.security:spring-security-crypto")

	// lombok 설정
	compileOnly("org.projectlombok:lombok")                // 컴파일 전용 (코드에는 포함되지 않음)
	annotationProcessor("org.projectlombok:lombok")        // 컴파일 타임에 lombok 처리

	// 개발 편의 도구
	developmentOnly("org.springframework.boot:spring-boot-devtools") // Live reload, 빠른 재시작 등

	// 실행 시 사용할 내장 DB
	runtimeOnly("com.h2database:h2") // 메모리 기반 H2 DB (테스트 및 개발용)

	// 테스트 관련 의존성
	testImplementation("org.springframework.boot:spring-boot-starter-test") // JUnit + Mockito + AssertJ 포함
	testRuntimeOnly("org.junit.platform:junit-platform-launcher") // JUnit 플랫폼 런처 (IDE 통합 실행)
}

// 테스트 설정: JUnit 5 플랫폼 사용 명시
tasks.withType<Test> {
	useJUnitPlatform()
}