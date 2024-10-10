-- Crear tabla Usuario
CREATE TABLE Usuario (
    id_usuario VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    paterno VARCHAR(50) NOT NULL,
    materno VARCHAR(50),
    correo VARCHAR(100) NOT NULL,
    contraseña VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE
);

-- Crear tabla Administrador
CREATE TABLE Administrador (
    id_usuario VARCHAR(20),
    sueldo DECIMAL(10, 2) NOT NULL,
    fecha_contratación DATE NOT NULL,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Crear tabla Sacerdote
CREATE TABLE Sacerdote (
    id_usuario VARCHAR(20),
    estado_servicio VARCHAR(20) NOT NULL,
    fecha_bautizo DATE,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Crear tabla Parroquiano
CREATE TABLE Parroquiano (
    id_usuario VARCHAR(20),
    fecha_ingreso DATE NOT NULL,
    estado_civil VARCHAR(20),
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Crear tabla Monaguillo
CREATE TABLE Monaguillo (
    id_usuario VARCHAR(20),
    genero_monaguillo VARCHAR(10),
    funcion VARCHAR(50),
    fecha_ingreso_monaguillo DATE,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Crear tabla Catequista
CREATE TABLE Catequista (
    id_usuario VARCHAR(20),
    genero_catequista VARCHAR(10),
    tipo_catequista VARCHAR(50),
    fecha_ingreso_catequista DATE,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Crear tabla Material Religioso
CREATE TABLE Material_Religioso (
    id_material VARCHAR(20) PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    nombre_material VARCHAR(100) NOT NULL,
    costo DECIMAL(10, 2),
    descripcion VARCHAR(100),
    id_administrador VARCHAR(20),
    FOREIGN KEY (id_administrador) REFERENCES Administrador(id_usuario)
);

-- Crear tabla Sacramento
CREATE TABLE Sacramento (
    id_sacramento VARCHAR(20) PRIMARY KEY,
    tipo_sacramento VARCHAR(50) NOT NULL,
    fecha_sacramento DATE
);

-- Crear tabla Certificado
CREATE TABLE Certificado (
    id_certificado VARCHAR(20) PRIMARY KEY,
    fecha_emision DATE NOT NULL,
    estado VARCHAR(20),
    id_sacramento VARCHAR(20),
    id_usuario_parroquiano VARCHAR(20),
    id_usuario_administrador VARCHAR(20),
    FOREIGN KEY (id_sacramento) REFERENCES Sacramento(id_sacramento),
    FOREIGN KEY (id_usuario_parroquiano) REFERENCES Parroquiano(id_usuario),
    FOREIGN KEY (id_usuario_administrador) REFERENCES Administrador(id_usuario)
);

-- Crear tabla Donación
CREATE TABLE Donacion (
    id_donacion VARCHAR(20) PRIMARY KEY,
    monto DECIMAL(10, 2) NOT NULL,
    fecha_donacion DATE NOT NULL,
    id_parroquiano VARCHAR(20),
    FOREIGN KEY (id_parroquiano) REFERENCES Parroquiano(id_usuario)
);

-- Crear tabla Misa
CREATE TABLE Misa (
    id_misa VARCHAR(20) PRIMARY KEY,
    tipo_misa VARCHAR(50) NOT NULL,
    fecha_misa DATE NOT NULL,
    hora_inicio_misa VARCHAR(50) NOT NULL,
    id_parroquiano VARCHAR(20),
    id_sacerdote VARCHAR(20),
    FOREIGN KEY (id_parroquiano) REFERENCES Parroquiano(id_usuario),
    FOREIGN KEY (id_sacerdote) REFERENCES Sacerdote(id_usuario)
);

-- Crear tabla Grupo Parroquial
CREATE TABLE Grupo_Parroquial (
    id_grupo VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100)
);

-- Crear tabla Evento
CREATE TABLE Evento (
    id_evento VARCHAR(20) PRIMARY KEY,
    descripcion VARCHAR(100),
    id_usuario VARCHAR(20),
    tipo_evento VARCHAR(50),
    lugar VARCHAR(100),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Crear tabla Catequesis
CREATE TABLE Catequesis (
    id_catequesis VARCHAR(20) PRIMARY KEY,
    tipo_catequesis VARCHAR(50) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    id_administrador VARCHAR(20),
    FOREIGN KEY (id_administrador) REFERENCES Administrador(id_usuario)
);
-- Crear tabla Gestiona
CREATE TABLE Gestiona (
    id_sacerdote VARCHAR(20),
    id_sacramento VARCHAR(20),
    PRIMARY KEY (id_sacerdote, id_sacramento),
    FOREIGN KEY (id_sacerdote) REFERENCES Sacerdote(id_usuario),
    FOREIGN KEY (id_sacramento) REFERENCES Sacramento(id_sacramento)
);

-- Crear tabla Ocupa
CREATE TABLE Ocupa (
    id_material VARCHAR(20),
    id_catequesis VARCHAR(20),
    PRIMARY KEY (id_material, id_catequesis),
    FOREIGN KEY (id_material) REFERENCES Material_Religioso(id_material),
    FOREIGN KEY (id_catequesis) REFERENCES Catequesis(id_catequesis)
);

-- Crear tabla Controla
CREATE TABLE Controla (
    id_donacion VARCHAR(20),
    id_sacerdote VARCHAR(20),
    PRIMARY KEY (id_donacion, id_sacerdote),
    FOREIGN KEY (id_donacion) REFERENCES Donacion(id_donacion),
    FOREIGN KEY (id_sacerdote) REFERENCES Sacerdote(id_usuario)
);

-- Crear tabla Dicta
CREATE TABLE Dicta (
    id_catequesis VARCHAR(20),
    id_catequista VARCHAR(20),
    lugar_catequesis VARCHAR(100),
    hora VARCHAR(100),
    PRIMARY KEY (id_catequesis, id_catequista),
    FOREIGN KEY (id_catequesis) REFERENCES Catequesis(id_catequesis),
    FOREIGN KEY (id_catequista) REFERENCES Catequista(id_usuario)
);

-- Crear tabla Realiza
CREATE TABLE Realiza (
    id_evento VARCHAR(20),
    id_catequesis VARCHAR(20),
    fecha_inicio_evento DATE,
    fecha_fin_evento DATE,
    PRIMARY KEY (id_evento, id_catequesis),
    FOREIGN KEY (id_evento) REFERENCES Evento(id_evento),
    FOREIGN KEY (id_catequesis) REFERENCES Catequesis(id_catequesis)
);

-- Crear tabla Participa
CREATE TABLE Participa (
    id_grupo VARCHAR(20),
    id_evento VARCHAR(20),
    cupos INT,
    PRIMARY KEY (id_grupo, id_evento),
    FOREIGN KEY (id_grupo) REFERENCES Grupo_Parroquial(id_grupo),
    FOREIGN KEY (id_evento) REFERENCES Evento(id_evento)
);

-- Crear tabla Pertenece
CREATE TABLE Pertenece (
    id_grupo VARCHAR(20),
    id_parroquiano VARCHAR(20),
    PRIMARY KEY (id_grupo, id_parroquiano),
    FOREIGN KEY (id_grupo) REFERENCES Grupo_Parroquial(id_grupo),
    FOREIGN KEY (id_parroquiano) REFERENCES Parroquiano(id_usuario)
);

-- Crear tabla Inscribe
CREATE TABLE Inscribe (
    id_usuario VARCHAR(20),
    id_inscripcion VARCHAR(20),
    id_catequesis VARCHAR(20),
    PRIMARY KEY (id_usuario, id_inscripcion, id_catequesis),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_catequesis) REFERENCES Catequesis(id_catequesis)
);

-- Crear tabla Ayuda
CREATE TABLE Ayuda (
    id_misa VARCHAR(20),
    id_monaguillo VARCHAR(20),
    PRIMARY KEY (id_misa, id_monaguillo),
    FOREIGN KEY (id_misa) REFERENCES Misa(id_misa),
    FOREIGN KEY (id_monaguillo) REFERENCES Monaguillo(id_usuario)
);
