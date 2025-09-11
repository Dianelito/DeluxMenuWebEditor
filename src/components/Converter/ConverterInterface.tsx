import React, { useState } from 'react';
import { Upload, Download, RefreshCw, FileText, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { CommandPanelsConverter } from '../../utils/commandPanelsConverter';

interface ConverterInterfaceProps {
  onConversionComplete: (yamlContent: string) => void;
}

export const ConverterInterface: React.FC<ConverterInterfaceProps> = ({
  onConversionComplete
}) => {
  const [inputYaml, setInputYaml] = useState('');
  const [outputYaml, setOutputYaml] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string>('');
  const [conversionInfo, setConversionInfo] = useState<{
    version: string;
    panelCount: number;
    panels: string[];
  } | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInputYaml(content);
      analyzeInput(content);
    };
    reader.readAsText(file);
    
    event.target.value = '';
  };

  const analyzeInput = (yamlContent: string) => {
    try {
      if (CommandPanelsConverter.isCommandPanelsConfig(yamlContent)) {
        const info = CommandPanelsConverter.getConfigInfo(yamlContent);
        setConversionInfo(info);
        setError('');
      } else {
        setConversionInfo(null);
        setError('The file does not appear to be a valid CommandPanels configuration');
      }
    } catch (err) {
      setError(`Error analyzing file: ${err.message}`);
      setConversionInfo(null);
    }
  };

  const handleConvert = async () => {
    if (!inputYaml.trim()) {
      setError('Please provide a CommandPanels configuration to convert');
      return;
    }

    setIsConverting(true);
    setError('');

    try {
      const converted = CommandPanelsConverter.convertFromYAML(inputYaml);
      setOutputYaml(converted);
      onConversionComplete(converted);
    } catch (err) {
      setError(`Error during conversion: ${err.message}`);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!outputYaml) return;

    const blob = new Blob([outputYaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deluxemenu_converted.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleInputChange = (value: string) => {
    setInputYaml(value);
    if (value.trim()) {
      analyzeInput(value);
    } else {
      setConversionInfo(null);
      setError('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          CommandPanels → DeluxeMenu Converter
        </h2>
        <p className="text-gray-600">
          Convert your CommandPanels v3/v4 menus to DeluxeMenu format
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            CommandPanels Configuration
          </h3>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept=".yml,.yaml"
              onChange={handleFileUpload}
              className="hidden"
              id="upload-file"
            />
            <label
              htmlFor="upload-file"
              className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Upload File</span>
            </label>
          </div>
        </div>

        <textarea
          value={inputYaml}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Function still in development"
        />

        {conversionInfo && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">
                Valid configuration detected
              </span>
            </div>
            <div className="text-sm text-green-700 space-y-1">
              <div>Version: <strong>{conversionInfo.version}</strong></div>
              <div>Panels found: <strong>{conversionInfo.panelCount}</strong></div>
              {conversionInfo.panels.length > 0 && (
                <div>
                  Names: <strong>{conversionInfo.panels.join(', ')}</strong>
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-800">Error</span>
            </div>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={handleConvert}
          disabled={!inputYaml.trim() || isConverting || !!error}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-lg transition-colors flex items-center space-x-2 mx-auto"
        >
          {isConverting ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Converting...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-5 h-5" />
              <span>Convert to DeluxeMenu</span>
            </>
          )}
        </button>
      </div>

      {outputYaml && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Converted DeluxeMenu Configuration
            </h3>
            <button
              onClick={handleDownload}
              className="px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>

          <textarea
            value={outputYaml}
            readOnly
            className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg bg-gray-50 resize-none"
          />

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">
                Conversion complete
              </span>
            </div>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• All items and commands have been converted</p>
              <p>• Materials have been updated to Minecraft 1.21.8</p>
              <p>• Permissions and requirements have been preserved</p>
              <p>• You can edit the menu using the integrated editor</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-800 mb-3">
          Conversion Features
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Automatic material conversion</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Preservation of commands and actions</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Maintenance of permissions</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Compatibility with Paper 1.21.8</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Hierarchical structure preserved</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Automatic filler items</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
