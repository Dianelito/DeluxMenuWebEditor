/**
 * Utilidades para parsear y generar YAML
 * Implementación simple sin dependencias externas
 */

export function parseYAML(yamlString: string): any {
  try {
    // Implementación básica de parser YAML
    // Para una implementación completa, se recomienda usar una librería como js-yaml
    
    const lines = yamlString.split('\n');
    const result: any = {};
    const stack: any[] = [result];
    let currentIndent = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmedLine = line.trim();
      
      // Saltar líneas vacías y comentarios
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue;
      }
      
      // Calcular indentación
      const indent = line.length - line.trimStart().length;
      
      // Ajustar el stack según la indentación
      while (stack.length > 1 && indent <= currentIndent) {
        stack.pop();
        currentIndent -= 2; // Asumiendo indentación de 2 espacios
      }
      
      const current = stack[stack.length - 1];
      
      if (trimmedLine.includes(':')) {
        const [key, ...valueParts] = trimmedLine.split(':');
        const value = valueParts.join(':').trim();
        const cleanKey = key.trim().replace(/['"]/g, '');
        
        if (value) {
          // Valor en la misma línea
          current[cleanKey] = parseValue(value);
        } else {
          // Objeto anidado
          current[cleanKey] = {};
          stack.push(current[cleanKey]);
          currentIndent = indent;
        }
      } else if (trimmedLine.startsWith('-')) {
        // Item de lista
        const value = trimmedLine.substring(1).trim();
        if (!Array.isArray(current)) {
          // Convertir a array si no lo es
          const parent = stack[stack.length - 2];
          const keys = Object.keys(parent);
          const lastKey = keys[keys.length - 1];
          parent[lastKey] = [];
          stack[stack.length - 1] = parent[lastKey];
        }
        current.push(parseValue(value));
      }
    }
    
    return result;
  } catch (error) {
    throw new Error(`Error parsing YAML: ${error.message}`);
  }
}

export function stringifyYAML(obj: any, indent: number = 0): string {
  const spaces = '  '.repeat(indent);
  let result = '';
  
  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (typeof item === 'object' && item !== null) {
        result += `${spaces}- ${stringifyYAML(item, indent + 1).trim()}\n`;
      } else {
        result += `${spaces}- ${formatValue(item)}\n`;
      }
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        result += `${spaces}${key}:\n`;
        for (const item of value) {
          if (typeof item === 'object' && item !== null) {
            result += `${spaces}  - ${stringifyYAML(item, indent + 2).trim()}\n`;
          } else {
            result += `${spaces}  - ${formatValue(item)}\n`;
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        result += `${spaces}${key}:\n`;
        result += stringifyYAML(value, indent + 1);
      } else {
        result += `${spaces}${key}: ${formatValue(value)}\n`;
      }
    }
  } else {
    return formatValue(obj);
  }
  
  return result;
}

function parseValue(value: string): any {
  const trimmed = value.trim();
  
  // Boolean
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  
  // Null
  if (trimmed === 'null' || trimmed === '~') return null;
  
  // Number
  if (/^-?\d+$/.test(trimmed)) {
    return parseInt(trimmed, 10);
  }
  if (/^-?\d+\.\d+$/.test(trimmed)) {
    return parseFloat(trimmed);
  }
  
  // String (remove quotes if present)
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  
  return trimmed;
}

function formatValue(value: any): string {
  if (value === null || value === undefined) {
    return 'null';
  }
  
  if (typeof value === 'boolean') {
    return value.toString();
  }
  
  if (typeof value === 'number') {
    return value.toString();
  }
  
  if (typeof value === 'string') {
    // Escapar strings que contienen caracteres especiales
    if (value.includes(':') || value.includes('#') || value.includes('\n') || 
        value.startsWith(' ') || value.endsWith(' ') || value.includes('"') || 
        value.includes("'")) {
      return `"${value.replace(/"/g, '\"')}"`;
    }
    return value;
  }
  
  return String(value);
}

/**
 * Valida si una string es YAML válido
 */
export function isValidYAML(yamlString: string): boolean {
  try {
    parseYAML(yamlString);
    return true;
  } catch {
    return false;
  }
}

/**
 * Formatea YAML con indentación consistente
 */
export function formatYAML(yamlString: string): string {
  try {
    const parsed = parseYAML(yamlString);
    return stringifyYAML(parsed);
  } catch (error) {
    throw new Error(`Error formatting YAML: ${error.message}`);
  }
}

/**
 * Combina múltiples objetos YAML
 */
export function mergeYAML(...yamls: string[]): string {
  const objects = yamls.map(yaml => parseYAML(yaml));
  const merged = Object.assign({}, ...objects);
  return stringifyYAML(merged);
}

/**
 * Extrae una sección específica de un YAML
 */
export function extractYAMLSection(yamlString: string, path: string): any {
  const obj = parseYAML(yamlString);
  const keys = path.split('.');
  
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return null;
    }
  }
  
  return current;
}
