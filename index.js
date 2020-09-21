/*! tableau-2.6.0 */
var tableauSoftware = {};
/*! tableau-2.6.0 */
(function() {
    /*! BEGIN MscorlibSlim */
    var global = {};
    (function(global) { 'use strict'; var ss = { __assemblies: {} };
        ss.initAssembly = function(obj, name, res) { res = res || {};
            obj.name = name;
            obj.toString = function() { return this.name };
            obj.__types = {};
            obj.getResourceNames = function() { return Object.keys(res) };
            obj.getResourceDataBase64 = function(name) { return res[name] || null };
            obj.getResourceData = function(name) { var r = res[name]; return r ? ss.dec64(r) : null };
            ss.__assemblies[name] = obj };
        ss.initAssembly(ss, 'mscorlib');
        ss.getAssemblies = function() { return Object.keys(ss.__assemblies).map(function(n) { return ss.__assemblies[n] }) };
        ss.isNullOrUndefined = function(o) { return (o === null) || (o === undefined) };
        ss.isValue = function(o) { return (o !== null) && (o !== undefined) };
        ss.referenceEquals = function(a, b) { return ss.isValue(a) ? a === b : !ss.isValue(b) };
        ss.mkdict = function() { var a = (arguments.length !== 1 ? arguments : arguments[0]); var r = {}; for (var i = 0; i < a.length; i += 2) { r[a[i]] = a[i + 1] } return r };
        ss.clone = function(t, o) { return o ? t.$clone(o) : o };
        ss.coalesce = function(a, b) { return ss.isValue(a) ? a : b };
        ss.isDate = function(obj) { return Object.prototype.toString.call(obj) === '[object Date]' };
        ss.isArray = function(obj) { return Object.prototype.toString.call(obj) === '[object Array]' };
        ss.isTypedArrayType = function(type) { return ['Float32Array', 'Float64Array', 'Int8Array', 'Int16Array', 'Int32Array', 'Uint8Array', 'Uint16Array', 'Uint32Array', 'Uint8ClampedArray'].indexOf(ss.getTypeFullName(type)) >= 0 };
        ss.isArrayOrTypedArray = function(obj) { return ss.isArray(obj) || ss.isTypedArrayType(ss.getInstanceType(obj)) };
        ss.equals = function(a, b) { if (!ss.isValue(a)) throw new ss_NullReferenceException('Object is null');
            else if (a !== ss && typeof(a.equals) === 'function') return a.equals(b); if (ss.isDate(a) && ss.isDate(b)) return a.valueOf() === b.valueOf();
            else if (typeof(a) === 'function' && typeof(b) === 'function') return ss.delegateEquals(a, b);
            else if (ss.isNullOrUndefined(a) && ss.isNullOrUndefined(b)) return true;
            else return a === b };
        ss.compare = function(a, b) { if (!ss.isValue(a)) throw new ss_NullReferenceException('Object is null');
            else if (typeof(a) === 'number' || typeof(a) === 'string' || typeof(a) === 'boolean') return ss.isValue(b) ? (a < b ? -1 : (a > b ? 1 : 0)) : 1;
            else if (ss.isDate(a)) return ss.isValue(b) ? ss.compare(a.valueOf(), b.valueOf()) : 1;
            else return a.compareTo(b) };
        ss.equalsT = function(a, b) { if (!ss.isValue(a)) throw new ss_NullReferenceException('Object is null');
            else if (typeof(a) === 'number' || typeof(a) === 'string' || typeof(a) === 'boolean') return a === b;
            else if (ss.isDate(a)) return a.valueOf() === b.valueOf();
            else return a.equalsT(b) };
        ss.staticEquals = function(a, b) { if (!ss.isValue(a)) return !ss.isValue(b);
            else return ss.isValue(b) ? ss.equals(a, b) : false };
        ss.shallowCopy = (function() { try { var x = Object.getOwnPropertyDescriptor({ a: 0 }, 'a').value; return true } catch (ex) { return false } })() ? function(source, target) { var keys = Object.keys(source); for (var i = 0, l = keys.length; i < l; i++) { Object.defineProperty(target, keys[i], Object.getOwnPropertyDescriptor(source, keys[i])) } } : function(source, target) { var keys = Object.keys(source); for (var i = 0, l = keys.length; i < l; i++) { target[keys[i]] = source[keys[i]] } }; if (typeof(window) == 'object') { if (!window.Element) { window.Element = function() {};
                window.Element.isInstanceOfType = function(instance) { return instance && typeof instance.constructor === 'undefined' && typeof instance.tagName === 'string' } }
            window.Element.__typeName = 'Element';
            ss.parseXml = function(markup) { var domParser = new DOMParser; return domParser.parseFromString(markup, 'text/xml') } }
        ss.clearKeys = function(d) { for (var n in d) { if (d.hasOwnProperty(n)) delete d[n] } };
        ss.keyExists = function(d, key) { return d[key] !== undefined }; if (!Object.keys) { Object.keys = (function() { var hasOwnProperty = Object.prototype.hasOwnProperty,
                    hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                    dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
                    dontEnumsLength = dontEnums.length; return function(obj) { if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) { throw new TypeError('Object.keys called on non-object') } var result = [],
                        prop, i; for (prop in obj) { if (hasOwnProperty.call(obj, prop)) { result.push(prop) } } if (hasDontEnumBug) { for (i = 0; i < dontEnumsLength; i++) { if (hasOwnProperty.call(obj, dontEnums[i])) { result.push(dontEnums[i]) } } } return result } }()) }
        ss.getKeyCount = function(d) { return Object.keys(d).length };
        ss.__genericCache = {};
        ss._makeGenericTypeName = function(genericType, typeArguments) { var result = ss.getTypeFullName(genericType); for (var i = 0; i < typeArguments.length; i++) result += (i === 0 ? '[' : ',') + '[' + ss.getTypeFullName(typeArguments[i]) + ']';
            result += ']'; return result };
        ss.makeGenericType = function(genericType, typeArguments) { var name = ss._makeGenericTypeName(genericType, typeArguments); return ss.__genericCache[ss._makeQName(name, genericType.__assembly)] || genericType.apply(null, typeArguments) };
        ss._registerGenericInstance = function(genericType, typeArguments, instance, members, statics, init) { if (!instance) { instance = function() {} } var name = ss._makeGenericTypeName(genericType, typeArguments);
            ss.__genericCache[ss._makeQName(name, genericType.__assembly)] = instance;
            instance.__typeName = name;
            instance.__assembly = genericType.__assembly;
            instance.__genericTypeDefinition = genericType;
            instance.__typeArguments = typeArguments; if (statics) { ss.shallowCopy(statics, instance) }
            init(instance); if (members) { ss.shallowCopy(members, instance.prototype) } return instance };
        ss.registerGenericClassInstance = function(genericType, typeArguments, instance, members, statics, baseType, getInterfaceTypesFunc) { return ss._registerGenericInstance(genericType, typeArguments, instance, members, statics, function(inst) { ss.initClass(inst, baseType ? baseType() : null, getInterfaceTypesFunc ? getInterfaceTypesFunc() : null) }) };
        ss.registerGenericStructInstance = function(genericType, typeArguments, instance, members, statics, getInterfaceTypesFunc) { return ss._registerGenericInstance(genericType, typeArguments, instance, members, statics, function(inst) { ss.initStruct(inst, getInterfaceTypesFunc ? getInterfaceTypesFunc() : null) }) };
        ss.registerGenericInterfaceInstance = function(genericType, typeArguments, members, getBaseInterfacesFunc) { return ss._registerGenericInstance(genericType, typeArguments, null, members, null, function(instance) { ss.initInterface(instance, members, getBaseInterfacesFunc ? getBaseInterfacesFunc() : null) }) };
        ss.isGenericTypeDefinition = function(type) { return type.__isGenericTypeDefinition || false };
        ss.getGenericTypeDefinition = function(type) { return type.__genericTypeDefinition || null };
        ss.getGenericParameterCount = function(type) { return type.__typeArgumentCount || 0 };
        ss.getGenericArguments = function(type) { return type.__typeArguments || null };
        ss.__anonymousCache = {};
        ss.anonymousType = function() { var members = Array.prototype.slice.call(arguments); var name = 'Anonymous<' + members.map(function(m) { return m[1] + ':' + ss.getTypeFullName(m[0]) }).join(',') + '>'; var type = ss.__anonymousCache[name]; if (!type) { type = new Function(members.map(function(m) { return m[1] }).join(','), members.map(function(m) { return 'this.' + m[1] + '=' + m[1] + ';' }).join(''));
                type.__typeName = name; var infos = members.map(function(m) { return { name: m[1], typeDef: type, type: 16, returnType: m[0], getter: { name: 'get_' + m[1], typeDef: type, params: [], returnType: m[0], fget: m[1] } } });
                infos.push({ name: '.ctor', typeDef: type, type: 1, params: members.map(function(m) { return m[0] }) });
                type.__metadata = { members: infos };
                ss.__anonymousCache[name] = type } return type };
        ss.setMetadata = function(type, metadata) { if (metadata.members) { for (var i = 0; i < metadata.members.length; i++) { var m = metadata.members[i];
                    m.typeDef = type; if (m.adder) m.adder.typeDef = type; if (m.remover) m.remover.typeDef = type; if (m.getter) m.getter.typeDef = type; if (m.setter) m.setter.typeDef = type } }
            type.__metadata = metadata; if (metadata.variance) { type.isAssignableFrom = function(source) { var check = function(target, type) { if (type.__genericTypeDefinition === target.__genericTypeDefinition && type.__typeArguments.length === target.__typeArguments.length) { for (var i = 0; i < target.__typeArguments.length; i++) { var v = target.__metadata.variance[i],
                                    t = target.__typeArguments[i],
                                    s = type.__typeArguments[i]; switch (v) {
                                    case 1:
                                        if (!ss.isAssignableFrom(t, s)) return false; break;
                                    case 2:
                                        if (!ss.isAssignableFrom(s, t)) return false; break;
                                    default:
                                        if (s !== t) return false } } return true } return false }; if (source.__interface && check(this, source)) return true; var ifs = ss.getInterfaces(source); for (var i = 0; i < ifs.length; i++) { if (ifs[i] === this || check(this, ifs[i])) return true } return false } } };
        ss.setMetadata = function(type, metadata) {};
        ss.mkType = function(asm, typeName, ctor, members, statics) { if (!ctor) ctor = function() {};
            ctor.__assembly = asm;
            ctor.__typeName = typeName; if (asm) asm.__types[typeName] = ctor; if (members) ctor.__members = members; if (statics) ss.shallowCopy(statics, ctor); return ctor };
        ss.mkEnum = function(asm, typeName, values, namedValues) { var result = ss.mkType(asm, typeName);
            ss.shallowCopy(values, result.prototype);
            result.__enum = true;
            result.getDefaultValue = result.createInstance = function() { return namedValues ? null : 0 };
            result.isInstanceOfType = function(instance) { return typeof instance === (namedValues ? 'string' : 'number') }; return result };
        ss.initClass = function(ctor, baseType, interfaces) { ctor.__class = true; if (baseType && baseType !== Object) { var f = function() {};
                f.prototype = baseType.prototype;
                ctor.prototype = new f;
                ctor.prototype.constructor = ctor } if (ctor.__members) { ss.shallowCopy(ctor.__members, ctor.prototype);
                delete ctor.__members } if (interfaces) ctor.__interfaces = interfaces };
        ss.initStruct = function(ctor, interfaces) { ss.initClass(ctor, null, interfaces);
            ctor.__class = false;
            ctor.getDefaultValue = ctor.getDefaultValue || ctor.createInstance || function() { return new ctor } };
        ss.initGenericClass = function(ctor, typeArgumentCount) { ctor.__class = true;
            ctor.__typeArgumentCount = typeArgumentCount;
            ctor.__isGenericTypeDefinition = true };
        ss.initGenericStruct = function(ctor, typeArgumentCount) { ss.initGenericClass(ctor, typeArgumentCount);
            ctor.__class = false };
        ss.initInterface = function(ctor, members, baseInterfaces) { ctor.__interface = true; if (baseInterfaces) { ctor.__interfaces = baseInterfaces }
            ss.shallowCopy(members, ctor.prototype);
            ctor.isAssignableFrom = function(type) { return ss.contains(ss.getInterfaces(type), this) } };
        ss.initGenericInterface = function(ctor, typeArgumentCount) { ctor.__interface = true;
            ctor.__typeArgumentCount = typeArgumentCount;
            ctor.__isGenericTypeDefinition = true };
        ss.getBaseType = function(type) { if (type === Object || type.__interface) { return null } else if (Object.getPrototypeOf) { return Object.getPrototypeOf(type.prototype).constructor } else { var p = type.prototype; if (Object.prototype.hasOwnProperty.call(p, 'constructor')) { var ownValue = p.constructor; try { delete p.constructor; return p.constructor } finally { p.constructor = ownValue } } return p.constructor } };
        ss.getTypeFullName = function(type) { return type.__typeName || type.name || (type.toString().match(/^\s*function\s*([^\s(]+)/) || [])[1] || 'Object' };
        ss._makeQName = function(name, asm) { return name + (asm ? ', ' + asm.name : '') };
        ss.getTypeQName = function(type) { return ss._makeQName(ss.getTypeFullName(type), type.__assembly) };
        ss.getTypeName = function(type) { var fullName = ss.getTypeFullName(type); var bIndex = fullName.indexOf('['); var nsIndex = fullName.lastIndexOf('.', bIndex >= 0 ? bIndex : fullName.length); return nsIndex > 0 ? fullName.substr(nsIndex + 1) : fullName };
        ss.getTypeNamespace = function(type) { var fullName = ss.getTypeFullName(type); var bIndex = fullName.indexOf('['); var nsIndex = fullName.lastIndexOf('.', bIndex >= 0 ? bIndex : fullName.length); return nsIndex > 0 ? fullName.substr(0, nsIndex) : '' };
        ss.getTypeAssembly = function(type) { if (ss.contains([Date, Number, Boolean, String, Function, Array], type)) return ss;
            else return type.__assembly || null };
        ss._getAssemblyType = function(asm, name) { if (asm.__types) { return asm.__types[name] || null } else { var a = name.split('.'); for (var i = 0; i < a.length; i++) { asm = asm[a[i]]; if (!ss.isValue(asm)) return null } if (typeof asm !== 'function') return null; return asm } };
        ss.getAssemblyTypes = function(asm) { var result = []; if (asm.__types) { for (var t in asm.__types) { if (asm.__types.hasOwnProperty(t)) result.push(asm.__types[t]) } } else { var traverse = function(s, n) { for (var c in s) { if (s.hasOwnProperty(c)) traverse(s[c], c) } if (typeof(s) === 'function' && ss.isUpper(n.charCodeAt(0))) result.push(s) };
                traverse(asm, '') } return result };
        ss.createAssemblyInstance = function(asm, typeName) { var t = ss.getType(typeName, asm); return t ? ss.createInstance(t) : null };
        ss.getInterfaces = function(type) { if (type.__interfaces) return type.__interfaces;
            else if (type === Date || type === Number) return [ss_IEquatable, ss_IComparable, ss_IFormattable];
            else if (type === Boolean || type === String) return [ss_IEquatable, ss_IComparable];
            else if (type === Array || ss.isTypedArrayType(type)) return [ss_IEnumerable, ss_ICollection, ss_IList, ss_IReadOnlyCollection, ss_IReadOnlyList];
            else return [] };
        ss.isInstanceOfType = function(instance, type) { if (ss.isNullOrUndefined(instance)) return false; if (typeof(type.isInstanceOfType) === 'function') return type.isInstanceOfType(instance); return ss.isAssignableFrom(type, ss.getInstanceType(instance)) };
        ss.isAssignableFrom = function(target, type) { return target === type || (typeof(target.isAssignableFrom) === 'function' && target.isAssignableFrom(type)) || type.prototype instanceof target };
        ss.isClass = function(type) { return type.__class === true || type === Array || type === Function || type === RegExp || type === String || type === Error || type === Object };
        ss.isEnum = function(type) { return !!type.__enum };
        ss.isFlags = function(type) { return type.__metadata && type.__metadata.enumFlags || false };
        ss.isInterface = function(type) { return !!type.__interface };
        ss.safeCast = function(instance, type) { if (type === true) return instance;
            else if (type === false) return null;
            else return ss.isInstanceOfType(instance, type) ? instance : null };
        ss.cast = function(instance, type) { if (instance === null || typeof(instance) === 'undefined') return instance;
            else if (type === true || (type !== false && ss.isInstanceOfType(instance, type))) return instance; throw new ss_InvalidCastException('Cannot cast object to type ' + ss.getTypeFullName(type)) };
        ss.getInstanceType = function(instance) { if (!ss.isValue(instance)) throw new ss_NullReferenceException('Cannot get type of null'); try { return instance.constructor } catch (ex) { return Object } };
        ss._getType = function(typeName, asm, re) { var outer = !re;
            re = re || /[[,\]]/g; var last = re.lastIndex,
                m = re.exec(typeName),
                tname, targs = []; var t; if (m) { tname = typeName.substring(last, m.index); switch (m[0]) {
                    case '[':
                        if (typeName[m.index + 1] !== '[') return null; for (;;) { re.exec(typeName);
                            t = ss._getType(typeName, global, re); if (!t) return null;
                            targs.push(t);
                            m = re.exec(typeName); if (m[0] === ']') break;
                            else if (m[0] !== ',') return null }
                        m = re.exec(typeName); if (m && m[0] === ',') { re.exec(typeName); if (!(asm = ss.__assemblies[(re.lastIndex > 0 ? typeName.substring(m.index + 1, re.lastIndex - 1) : typeName.substring(m.index + 1)).trim()])) return null } break;
                    case ']':
                        break;
                    case ',':
                        re.exec(typeName); if (!(asm = ss.__assemblies[(re.lastIndex > 0 ? typeName.substring(m.index + 1, re.lastIndex - 1) : typeName.substring(m.index + 1)).trim()])) return null; break } } else { tname = typeName.substring(last) } if (outer && re.lastIndex) return null;
            t = ss._getAssemblyType(asm, tname.trim()); return targs.length ? ss.makeGenericType(t, targs) : t };
        ss.getType = function(typeName, asm) { return typeName ? ss._getType(typeName, asm || global) : null };
        ss.getDefaultValue = function(type) { if (typeof(type.getDefaultValue) === 'function') return type.getDefaultValue();
            else if (type === Boolean) return false;
            else if (type === Date) return new Date(0);
            else if (type === Number) return 0; return null };
        ss.createInstance = function(type) { if (typeof(type.createInstance) === 'function') return type.createInstance();
            else if (type === Boolean) return false;
            else if (type === Date) return new Date(0);
            else if (type === Number) return 0;
            else if (type === String) return '';
            else return new type }; var ss_IFormattable = ss.IFormattable = ss.mkType(ss, 'ss.IFormattable');
        ss.initInterface(ss_IFormattable, { format: null }); var ss_IComparable = ss.IComparable = ss.mkType(ss, 'ss.IComparable');
        ss.initInterface(ss_IComparable, { compareTo: null }); var ss_IEquatable = ss.IEquatable = ss.mkType(ss, 'ss.IEquatable');
        ss.initInterface(ss_IEquatable, { equalsT: null });
        ss.isNullOrEmptyString = function(s) { return !s || !s.length }; if (!String.prototype.trim) { String.prototype.trim = function() { return ss.trimStartString(ss.trimEndString(this)) } }
        ss.trimEndString = function(s, chars) { return s.replace(chars ? new RegExp('[' + String.fromCharCode.apply(null, chars) + ']+$') : /\s*$/, '') };
        ss.trimStartString = function(s, chars) { return s.replace(chars ? new RegExp('^[' + String.fromCharCode.apply(null, chars) + ']+') : /^\s*/, '') };
        ss.trimString = function(s, chars) { return ss.trimStartString(ss.trimEndString(s, chars), chars) };
        ss.arrayClone = function(arr) { if (arr.length === 1) { return [arr[0]] } else { return Array.apply(null, arr) } }; if (!Array.prototype.map) { Array.prototype.map = function(callback, instance) { var length = this.length; var mapped = new Array(length); for (var i = 0; i < length; i++) { if (i in this) { mapped[i] = callback.call(instance, this[i], i, this) } } return mapped } } if (!Array.prototype.some) { Array.prototype.some = function(callback, instance) { var length = this.length; for (var i = 0; i < length; i++) { if (i in this && callback.call(instance, this[i], i, this)) { return true } } return false } } if (!Array.prototype.forEach) { Array.prototype.forEach = function(callback, thisArg) { var T, k; if (this == null) { throw new TypeError(' this is null or not defined') } var O = Object(this); var len = O.length >>> 0; if (typeof callback !== 'function') { throw new TypeError(callback + ' is not a function') } if (arguments.length > 1) { T = thisArg }
                k = 0; while (k < len) { var kValue; if (k in O) { kValue = O[k];
                        callback.call(T, kValue, k, O) }
                    k++ } } } if (!Array.prototype.filter) { Array.prototype.filter = function(fun) { if (this === void 0 || this === null) { throw new TypeError } var t = Object(this); var len = t.length >>> 0; if (typeof fun !== 'function') { throw new TypeError } var res = []; var thisArg = arguments.length >= 2 ? arguments[1] : void 0; for (var i = 0; i < len; i++) { if (i in t) { var val = t[i]; if (fun.call(thisArg, val, i, t)) { res.push(val) } } } return res } }
        ss._delegateContains = function(targets, object, method) { for (var i = 0; i < targets.length; i += 2) { if (targets[i] === object && targets[i + 1] === method) { return true } } return false };
        ss._mkdel = function(targets) { var delegate = function() { if (targets.length === 2) { return targets[1].apply(targets[0], arguments) } else { var clone = ss.arrayClone(targets); for (var i = 0; i < clone.length; i += 2) { if (ss._delegateContains(targets, clone[i], clone[i + 1])) { clone[i + 1].apply(clone[i], arguments) } } return null } };
            delegate._targets = targets; return delegate };
        ss.mkdel = function(object, method) { if (!object) { return method } if (typeof method === 'string') { method = object[method] } return ss._mkdel([object, method]) };
        ss.delegateCombine = function(delegate1, delegate2) { if (!delegate1) { if (!delegate2._targets) { return ss.mkdel(null, delegate2) } return delegate2 } if (!delegate2) { if (!delegate1._targets) { return ss.mkdel(null, delegate1) } return delegate1 } var targets1 = delegate1._targets ? delegate1._targets : [null, delegate1]; var targets2 = delegate2._targets ? delegate2._targets : [null, delegate2]; return ss._mkdel(targets1.concat(targets2)) };
        ss.delegateRemove = function(delegate1, delegate2) { if (!delegate1 || (delegate1 === delegate2)) { return null } var targets = delegate1._targets; if (!delegate2 || !targets) { return delegate1 } var object = null; var method; if (delegate2._targets) { object = delegate2._targets[0];
                method = delegate2._targets[1] } else { method = delegate2 } for (var i = 0; i < targets.length; i += 2) { if ((targets[i] === object) && (targets[i + 1] === method)) { if (targets.length === 2) { return null } var t = ss.arrayClone(targets);
                    t.splice(i, 2); return ss._mkdel(t) } } return delegate1 };
        ss.delegateEquals = function(a, b) { if (a === b) return true; if (!a._targets && !b._targets) return false; var ta = a._targets || [null, a],
                tb = b._targets || [null, b]; if (ta.length !== tb.length) return false; for (var i = 0; i < ta.length; i++) { if (ta[i] !== tb[i]) return false } return true }; var ss_Enum = ss.Enum = ss.mkType(ss, 'ss.Enum', {});
        ss.initClass(ss_Enum);
        ss_Enum.getValues = function Enum$getValues(enumType) { var parts = []; var values = enumType.prototype; for (var i in values) { if (values.hasOwnProperty(i)) parts.push(values[i]) } return parts }; var ss_IEnumerator = ss.IEnumerator = ss.mkType(ss, 'ss.IEnumerator');
        ss.initInterface(ss_IEnumerator, { current: null, moveNext: null, reset: null }, [ss_IDisposable]); var ss_IEnumerable = ss.IEnumerable = ss.mkType(ss, 'ss.IEnumerable');
        ss.initInterface(ss_IEnumerable, { getEnumerator: null });
        ss.getEnumerator = function(obj) { return obj.getEnumerator ? obj.getEnumerator() : new ss_ArrayEnumerator(obj) }; var ss_ICollection = ss.ICollection = ss.mkType(ss, 'ss.ICollection');
        ss.initInterface(ss_ICollection, { get_count: null, add: null, clear: null, remove: null, contains: null }, [ss_IEnumerable]);
        ss.count = function(obj) { return obj.get_count ? obj.get_count() : obj.length };
        ss.add = function(obj, item) { if (obj.add) obj.add(item);
            else if (ss.isArray(obj)) obj.push(item);
            else throw new ss_NotSupportedException };
        ss.clear = function(obj) { if (obj.clear) obj.clear();
            else if (ss.isArray(obj)) obj.length = 0;
            else throw new ss_NotSupportedException };
        ss.remove = function(obj, item) { if (obj.remove) return obj.remove(item);
            else if (ss.isArray(obj)) { var index = ss.indexOf(obj, item); if (index >= 0) { obj.splice(index, 1); return true } return false } else throw new ss_NotSupportedException };
        ss.contains = function(obj, item) { if (obj.contains) return obj.contains(item);
            else return ss.indexOf(obj, item) >= 0 }; var ss_IReadOnlyCollection = ss.IReadOnlyCollection = ss.mkType(ss, 'ss.IReadOnlyCollection');
        ss.initInterface(ss_IReadOnlyCollection, { get_count: null, contains: null }, [ss_IEnumerable]); var ss_IEqualityComparer = ss.IEqualityComparer = ss.mkType(ss, 'ss.IEqualityComparer');
        ss.initInterface(ss_IEqualityComparer, { areEqual: null, getObjectHashCode: null }); var ss_IComparer = ss.IComparer = ss.mkType(ss, 'ss.IComparer');
        ss.initInterface(ss_IComparer, { compare: null });
        ss.unbox = function(instance) { if (!ss.isValue(instance)) throw new ss_InvalidOperationException('Nullable object must have a value.'); return instance }; var ss_Nullable$1 = ss.Nullable$1 = ss.mkType(ss, 'ss.Nullable$1', function(T) { var $type = ss.registerGenericClassInstance(ss_Nullable$1, [T], null, {}, { isInstanceOfType: function(instance) { return ss.isInstanceOfType(instance, T) } }); return $type }, null, { eq: function(a, b) { return !ss.isValue(a) ? !ss.isValue(b) : (a === b) }, ne: function(a, b) { return !ss.isValue(a) ? ss.isValue(b) : (a !== b) }, le: function(a, b) { return ss.isValue(a) && ss.isValue(b) && a <= b }, ge: function(a, b) { return ss.isValue(a) && ss.isValue(b) && a >= b }, lt: function(a, b) { return ss.isValue(a) && ss.isValue(b) && a < b }, gt: function(a, b) { return ss.isValue(a) && ss.isValue(b) && a > b }, sub: function(a, b) { return ss.isValue(a) && ss.isValue(b) ? a - b : null }, add: function(a, b) { return ss.isValue(a) && ss.isValue(b) ? a + b : null }, mod: function(a, b) { return ss.isValue(a) && ss.isValue(b) ? a % b : null }, div: function(a, b) { return ss.isValue(a) && ss.isValue(b) ? a / b : null }, mul: function(a, b) { return ss.isValue(a) && ss.isValue(b) ? a * b : null }, band: function(a, b) { return ss.isValue(a) && ss.isValue(b) ? a & b : null }, bor: function(a, b) { return ss.isValue(a) && ss.isValue(b) ? a | b : null }, bxor: function(a, b) { return ss.isValue(a) && ss.isValue(b) ? a ^ b : null }, shl: function(a, b) { return ss.isValue(a) && ss.isValue(b) ? a << b : null }, srs: function(a, b) { return ss.isValue(a) && ss.isValue(b) ? a >> b : null }, sru: function(a, b) { return ss.isValue(a) && ss.isValue(b) ? a >>> b : null }, and: function(a, b) { if (a === true && b === true) return true;
                else if (a === false || b === false) return false;
                else return null }, or: function(a, b) { if (a === true || b === true) return true;
                else if (a === false && b === false) return false;
                else return null }, xor: function(a, b) { return ss.isValue(a) && ss.isValue(b) ? !!(a ^ b) : null }, not: function(a) { return ss.isValue(a) ? !a : null }, neg: function(a) { return ss.isValue(a) ? -a : null }, pos: function(a) { return ss.isValue(a) ? +a : null }, cpl: function(a) { return ss.isValue(a) ? ~a : null }, lift1: function(f, o) { return ss.isValue(o) ? f(o) : null }, lift2: function(f, a, b) { return ss.isValue(a) && ss.isValue(b) ? f(a, b) : null }, liftcmp: function(f, a, b) { return ss.isValue(a) && ss.isValue(b) ? f(a, b) : false }, lifteq: function(f, a, b) { var va = ss.isValue(a),
                    vb = ss.isValue(b); return (!va && !vb) || (va && vb && f(a, b)) }, liftne: function(f, a, b) { var va = ss.isValue(a),
                    vb = ss.isValue(b); return (va !== vb) || (va && f(a, b)) } });
        ss.initGenericClass(ss_Nullable$1, 1); var ss_IList = ss.IList = ss.mkType(ss, 'ss.IList');
        ss.initInterface(ss_IList, { get_item: null, set_item: null, indexOf: null, insert: null, removeAt: null }, [ss_ICollection, ss_IEnumerable]);
        ss.getItem = function(obj, index) { return obj.get_item ? obj.get_item(index) : obj[index] };
        ss.setItem = function(obj, index, value) { obj.set_item ? obj.set_item(index, value) : (obj[index] = value) };
        ss.indexOf = function(obj, item) { if ((!item || typeof(item.equals) !== 'function') && typeof(obj.indexOf) === 'function') { return obj.indexOf(item) } else if (ss.isArrayOrTypedArray(obj)) { for (var i = 0; i < obj.length; i++) { if (ss.staticEquals(obj[i], item)) { return i } } return -1 } else return obj.indexOf(item) };
        ss.insert = function(obj, index, item) { if (obj.insert) obj.insert(index, item);
            else if (ss.isArray(obj)) obj.splice(index, 0, item);
            else throw new ss_NotSupportedException };
        ss.removeAt = function(obj, index) { if (obj.removeAt) obj.removeAt(index);
            else if (ss.isArray(obj)) obj.splice(index, 1);
            else throw new ss_NotSupportedException }; var ss_IReadOnlyList = ss.IReadOnlyList = ss.mkType(ss, 'ss.IReadOnlyList');
        ss.initInterface(ss_IReadOnlyList, { get_item: null }, [ss_IReadOnlyCollection, ss_IEnumerable]); var defInt = function(name, min, max) { var type = ss[name] = ss.mkType(ss, 'ss.' + name, function() {}, null, { isInstanceOfType: function(instance) { return typeof(instance) === 'number' && Math.round(instance, 0) === instance && instance >= min && instance <= max }, createInstance: function() { return 0 } });
            ss.initStruct(type, [ss_IEquatable, ss_IComparable, ss_IFormattable]); return type }; var ss_Byte = defInt('Byte', 0, 255); var ss_SByte = defInt('SByte', -128, 127); var ss_Int16 = defInt('Int16', -32768, 32767); var ss_UInt16 = defInt('UInt16', 0, 65535); var ss_Int32 = defInt('Int32', -2147483648, 2147483647); var ss_UInt32 = defInt('UInt32', 0, 4294967295); var ss_Int64 = defInt('Int64', -9223372036854775808, 9223372036854775807); var ss_UInt64 = defInt('UInt64', 0, 18446744073709551615); var ss_Char = defInt('Char', 0, 65535);
        ss.sxb = function(x) { return x | (x & 0x80 ? 0xffffff00 : 0) };
        ss.sxs = function(x) { return x | (x & 0x8000 ? 0xffff0000 : 0) };
        ss.clip8 = function(x) { return ss.isValue(x) ? ss.sxb(x & 0xff) : null };
        ss.clipu8 = function(x) { return ss.isValue(x) ? x & 0xff : null };
        ss.clip16 = function(x) { return ss.isValue(x) ? ss.sxs(x & 0xffff) : null };
        ss.clipu16 = function(x) { return ss.isValue(x) ? x & 0xffff : null };
        ss.clip32 = function(x) { return ss.isValue(x) ? x | 0 : null };
        ss.clipu32 = function(x) { return ss.isValue(x) ? x >>> 0 : null };
        ss.clip64 = function(x) { return ss.isValue(x) ? (Math.floor(x / 0x100000000) | 0) * 0x100000000 + (x >>> 0) : null };
        ss.clipu64 = function(x) { return ss.isValue(x) ? (Math.floor(x / 0x100000000) >>> 0) * 0x100000000 + (x >>> 0) : null };
        ss.ck = function(x, tp) { if (ss.isValue(x) && !tp.isInstanceOfType(x)) throw new ss_OverflowException; return x };
        ss.trunc = function(n) { return ss.isValue(n) ? (n > 0 ? Math.floor(n) : Math.ceil(n)) : null };
        ss.idiv = function(a, b) { if (!ss.isValue(a) || !ss.isValue(b)) return null; if (!b) throw new ss_DivideByZeroException; return ss.trunc(a / b) };
        ss.imod = function(a, b) { if (!ss.isValue(a) || !ss.isValue(b)) return null; if (!b) throw new ss_DivideByZeroException; return a % b }; var ss_JsDate = ss.JsDate = ss.mkType(ss, 'ss.JsDate', function() {}, null, { createInstance: function() { return new Date }, isInstanceOfType: function(instance) { return instance instanceof Date } });
        ss.initClass(ss_JsDate, null, [ss_IEquatable, ss_IComparable]); var ss_ArrayEnumerator = ss.ArrayEnumerator = ss.mkType(ss, 'ss.ArrayEnumerator', function(array) { this._array = array;
            this._index = -1 }, { moveNext: function() { this._index++; return (this._index < this._array.length) }, reset: function() { this._index = -1 }, current: function() { if (this._index < 0 || this._index >= this._array.length) throw 'Invalid operation'; return this._array[this._index] }, dispose: function() {} });
        ss.initClass(ss_ArrayEnumerator, null, [ss_IEnumerator, ss_IDisposable]); var ss_ObjectEnumerator = ss.ObjectEnumerator = ss.mkType(ss, 'ss.ObjectEnumerator', function(o) { this._keys = Object.keys(o);
            this._index = -1;
            this._object = o }, { moveNext: function() { this._index++; return (this._index < this._keys.length) }, reset: function() { this._index = -1 }, current: function() { if (this._index < 0 || this._index >= this._keys.length) throw new ss_InvalidOperationException('Invalid operation'); var k = this._keys[this._index]; return { key: k, value: this._object[k] } }, dispose: function() {} });
        ss.initClass(ss_ObjectEnumerator, null, [ss_IEnumerator, ss_IDisposable]); var ss_EqualityComparer = ss.EqualityComparer = ss.mkType(ss, 'ss.EqualityComparer', function() {}, { areEqual: function(x, y) { return ss.staticEquals(x, y) }, getObjectHashCode: function(obj) { return ss.isValue(obj) ? ss.getHashCode(obj) : 0 } });
        ss.initClass(ss_EqualityComparer, null, [ss_IEqualityComparer]);
        ss_EqualityComparer.def = new ss_EqualityComparer; var ss_Comparer = ss.Comparer = ss.mkType(ss, 'ss.Comparer', function(f) { this.f = f }, { compare: function(x, y) { return this.f(x, y) } });
        ss.initClass(ss_Comparer, null, [ss_IComparer]);
        ss_Comparer.def = new ss_Comparer(function(a, b) { if (!ss.isValue(a)) return !ss.isValue(b) ? 0 : -1;
            else if (!ss.isValue(b)) return 1;
            else return ss.compare(a, b) }); var ss_IDisposable = ss.IDisposable = ss.mkType(ss, 'ss.IDisposable');
        ss.initInterface(ss_IDisposable, { dispose: null }); var ss_StringBuilder = ss.StringBuilder = ss.mkType(ss, 'ss.StringBuilder', function(s) { this._parts = (ss.isValue(s) && s !== '') ? [s] : [];
            this.length = ss.isValue(s) ? s.length : 0 }, { append: function(o) { if (ss.isValue(o)) { var s = o.toString();
                    ss.add(this._parts, s);
                    this.length += s.length } return this }, appendChar: function(c) { return this.append(String.fromCharCode(c)) }, appendLine: function(s) { this.append(s);
                this.append('\r\n'); return this }, appendLineChar: function(c) { return this.appendLine(String.fromCharCode(c)) }, clear: function() { this._parts = [];
                this.length = 0 }, toString: function() { return this._parts.join('') } });
        ss.initClass(ss_StringBuilder); var ss_EventArgs = ss.EventArgs = ss.mkType(ss, 'ss.EventArgs', function() {});
        ss.initClass(ss_EventArgs);
        ss_EventArgs.Empty = new ss_EventArgs; var ss_Exception = ss.Exception = ss.mkType(ss, 'ss.Exception', function(message, innerException) { this._message = message || 'An error occurred.';
            this._innerException = innerException || null;
            this._error = new Error }, { get_message: function() { return this._message }, get_innerException: function() { return this._innerException }, get_stack: function() { return this._error.stack }, toString: function() { var message = this._message; var exception = this; if (ss.isNullOrEmptyString(message)) { if (ss.isValue(ss.getInstanceType(exception)) && ss.isValue(ss.getTypeFullName(ss.getInstanceType(exception)))) { message = ss.getTypeFullName(ss.getInstanceType(exception)) } else { message = '[object Exception]' } } return message } }, { wrap: function(o) { if (ss.isInstanceOfType(o, ss_Exception)) { return o } else if (o instanceof TypeError) { return new ss_NullReferenceException(o.message, new ss_JsErrorException(o)) } else if (o instanceof RangeError) { return new ss_ArgumentOutOfRangeException(null, o.message, new ss_JsErrorException(o)) } else if (o instanceof Error) { return new ss_JsErrorException(o) } else { return new ss_Exception(o.toString()) } } });
        ss.initClass(ss_Exception); var ss_NotImplementedException = ss.NotImplementedException = ss.mkType(ss, 'ss.NotImplementedException', function(message, innerException) { ss_Exception.call(this, message || 'The method or operation is not implemented.', innerException) });
        ss.initClass(ss_NotImplementedException, ss_Exception); var ss_NotSupportedException = ss.NotSupportedException = ss.mkType(ss, 'ss.NotSupportedException', function(message, innerException) { ss_Exception.call(this, message || 'Specified method is not supported.', innerException) });
        ss.initClass(ss_NotSupportedException, ss_Exception); var ss_JsErrorException = ss.JsErrorException = ss.mkType(ss, 'ss.JsErrorException', function(error, message, innerException) { ss_Exception.call(this, message || error.message, innerException);
            this.error = error }, { get_stack: function() { return this.error.stack } });
        ss.initClass(ss_JsErrorException, ss_Exception); var ss_ArgumentException = ss.ArgumentException = ss.mkType(ss, 'ss.ArgumentException', function(message, paramName, innerException) { ss_Exception.call(this, message || 'Value does not fall within the expected range.', innerException);
            this.paramName = paramName || null });
        ss.initClass(ss_ArgumentException, ss_Exception); var ss_ArgumentNullException = ss.ArgumentNullException = ss.mkType(ss, 'ss.ArgumentNullException', function(paramName, message, innerException) { if (!message) { message = 'Value cannot be null.'; if (paramName) message += '\nParameter name: ' + paramName }
            ss_ArgumentException.call(this, message, paramName, innerException) });
        ss.initClass(ss_ArgumentNullException, ss_ArgumentException); var ss_ArgumentOutOfRangeException = ss.ArgumentOutOfRangeException = ss.mkType(ss, 'ss.ArgumentOutOfRangeException', function(paramName, message, innerException, actualValue) { if (!message) { message = 'Value is out of range.'; if (paramName) message += '\nParameter name: ' + paramName }
            ss_ArgumentException.call(this, message, paramName, innerException);
            this.actualValue = actualValue || null });
        ss.initClass(ss_ArgumentOutOfRangeException, ss_ArgumentException); var ss_FormatException = ss.FormatException = ss.mkType(ss, 'ss.FormatException', function(message, innerException) { ss_Exception.call(this, message || 'Invalid format.', innerException) });
        ss.initClass(ss_FormatException, ss_Exception); var ss_ArithmeticException = ss.ArithmeticException = ss.mkType(ss, 'ss.ArithmeticException', function(message, innerException) { ss_Exception.call(this, message || 'Overflow or underflow in the arithmetic operation.', innerException) });
        ss.initClass(ss_ArithmeticException, ss_Exception); var ss_OverflowException = ss.OverflowException = ss.mkType(ss, 'ss.OverflowException', function(message, innerException) { ss_ArithmeticException.call(this, message || 'Arithmetic operation resulted in an overflow.', innerException) });
        ss.initClass(ss_OverflowException, ss_ArithmeticException); var ss_DivideByZeroException = ss.DivideByZeroException = ss.mkType(ss, 'ss.DivideByZeroException', function(message, innerException) { ss_ArithmeticException.call(this, message || 'Division by 0.', innerException) });
        ss.initClass(ss_DivideByZeroException, ss_ArithmeticException); var ss_InvalidCastException = ss.InvalidCastException = ss.mkType(ss, 'ss.InvalidCastException', function(message, innerException) { ss_Exception.call(this, message || 'The cast is not valid.', innerException) });
        ss.initClass(ss_InvalidCastException, ss_Exception); var ss_InvalidOperationException = ss.InvalidOperationException = ss.mkType(ss, 'ss.InvalidOperationException', function(message, innerException) { ss_Exception.call(this, message || 'Operation is not valid due to the current state of the object.', innerException) });
        ss.initClass(ss_InvalidOperationException, ss_Exception); var ss_NullReferenceException = ss.NullReferenceException = ss.mkType(ss, 'ss.NullReferenceException', function(message, innerException) { ss_Exception.call(this, message || 'Object is null.', innerException) });
        ss.initClass(ss_NullReferenceException, ss_Exception); var ss_KeyNotFoundException = ss.KeyNotFoundException = ss.mkType(ss, 'ss.KeyNotFoundException', function(message, innerException) { ss_Exception.call(this, message || 'Key not found.', innerException) });
        ss.initClass(ss_KeyNotFoundException, ss_Exception); var ss_AmbiguousMatchException = ss.AmbiguousMatchException = ss.mkType(ss, 'ss.AmbiguousMatchException', function(message, innerException) { ss_Exception.call(this, message || 'Ambiguous match.', innerException) });
        ss.initClass(ss_AmbiguousMatchException, ss_Exception);
        global.ss = ss })(global);
    var ss = global.ss;
    /*! BEGIN CoreSlim */
    (function() { 'dont use strict'; var a = {};
        global.tab = global.tab || {};
        ss.initAssembly(a, 'tabcoreslim'); var b = global.tab.BaseLogAppender = ss.mkType(a, 'tab.BaseLogAppender', function() { this.$0 = null;
            this.$0 = [] }, { clearFilters: function() { ss.clear(this.$0) }, addFilter: function(n) { this.$0.push(n) }, removeFilter: function(n) { ss.remove(this.$0, n) }, log: function(n, o, p, q) {}, logInternal: null, formatMessage: function(n, o) { if (ss.isNullOrUndefined(o) || o.length === 0) { return n } var p = new ss.StringBuilder; var q = 0; var r = false; for (var s = 0; s < n.length; s++) { var t = n.charCodeAt(s); if (t === 37) { if (r) { p.append('%');
                            r = false } else { r = true } } else { if (r) { switch (t) {
                                case 98:
                                case 115:
                                case 100:
                                case 110:
                                case 111:
                                    { p.append(((o.length > q) ? o[q] : ''));q++; break } } } else { p.appendChar(t) }
                        r = false } } return p.toString() } }); var c = global.tab.ConsoleLogAppender = ss.mkType(a, 'tab.ConsoleLogAppender', function() { this.$2 = null;
            b.call(this) }, { logInternal: function(n, o, p, q) { if (typeof(window.console) !== 'object') { return }
                p = n.get_name() + ': ' + p; var r = []; var s = r.concat(p);
                r = s.concat.apply(s, q); try { Function.prototype.apply.call(this.$1(o), window.console, r) } catch (t) {} }, $1: function(n) { var o = window.self['console']; if (ss.isNullOrUndefined(this.$2)) { this.$2 = {};
                    this.$2[(1).toString()] = o.log;
                    this.$2[(4).toString()] = o.error;
                    this.$2[(2).toString()] = o.info;
                    this.$2[(3).toString()] = o.warn } var p = this.$2[n.toString()]; if (ss.isNullOrUndefined(p)) { p = o.log } return p } }); var d = global.tab.CookieHelper = ss.mkType(a, 'tab.CookieHelper', null, null, { getValueForCookie: function(n) { var o = e.getCookie().match(new RegExp('(?:^|;) ?' + n + '=([^;]*)(?:;|$)')); if (ss.isNullOrUndefined(o) || o.length < 2) { return null } return o[1] }, setCookie: function(n, o, p, q) { var r = n + '=' + o + ';path=' + p + ';'; if (!ss.staticEquals(q, null)) { r += 'expires=' + q.toUTCString() }
                e.setCookie(r) }, deleteCookie: function(n, o) { var p = new Date(0);
                e.setCookie(n + '=;path=' + o + ';expires=' + p.toUTCString()) } }); var e = global.tab.DocumentHelper = ss.mkType(a, 'tab.DocumentHelper', null, null, { get_documentClientWidth: function() { return document.documentElement.clientWidth }, get_documentClientHeight: function() { return document.documentElement.clientHeight }, getCookie: function() { return document.cookie }, setCookie: function(n) { document.cookie = n } }); var f = global.tab.EscapingUtil = ss.mkType(a, 'tab.EscapingUtil', null, null, { escapeHtml: function(n) { var o = ss.coalesce(n, '');
                o = o.replace(new RegExp('&', 'g'), '&amp;');
                o = o.replace(new RegExp('<', 'g'), '&lt;');
                o = o.replace(new RegExp('>', 'g'), '&gt;');
                o = o.replace(new RegExp('"', 'g'), '&quot;');
                o = o.replace(new RegExp("'", 'g'), '&#39;');
                o = o.replace(new RegExp('/', 'g'), '&#47;'); if ((new RegExp('^ +$')).test(o)) { o = o.replace(new RegExp(' ', 'g'), '&nbsp;') } return o } }); var g = global.tab.Log = ss.mkType(a, 'tab.Log', function() {}, null, { get: function(n) { return i.lazyGetLogger(ss.getInstanceType(n)) }, get$1: function(n) { return i.lazyGetLogger(n) } }); var h = global.tab.LogAppenderInstance = ss.mkType(a, 'tab.LogAppenderInstance', function(n) { this.$0 = null;
            this.$1$1 = null;
            this.$0 = n }, { get_instance: function() { return this.$1$1 }, set_instance: function(n) { this.$1$1 = n }, enableLogging: function(n) { if (ss.isNullOrUndefined(this.get_instance())) { this.set_instance(this.$0());
                    i.addAppender(this.get_instance()) } else if (!i.hasAppender(this.get_instance())) { i.addAppender(this.get_instance()) }
                this.get_instance().addFilter(ss.coalesce(n, function(o, p) { return true })) }, disableLogging: function() { if (ss.isNullOrUndefined(this.get_instance())) { return }
                i.removeAppender(this.get_instance());
                this.set_instance(null) } }); var i = global.tab.Logger = ss.mkType(a, 'tab.Logger', function(n) { this.$1 = null;
            this.$1 = n }, { get_name: function() { return this.$1 }, debug: function(n, o) {}, info: function(n, o) {}, warn: function(n, o) {}, error: function(n, o) {}, log: function(n, o, p) {}, $0: function(n, o, p) { try { for (var q = 0; q < i.$3.length; q++) { var r = i.$3[q];
                        r.log(this, n, o, p) } } catch (s) {} } }, { get_globalLog: function() { return i.global }, clearFilters: function() { for (var n = 0; n < i.$3.length; n++) { var o = i.$3[n];
                    o.clearFilters() }
                i.$4.splice(0, i.$4.length) }, filterByLogger: function(n, o) { o = o || 0;
                i.$0(function(p, q) { return ss.referenceEquals(p, n) && q >= o }) }, filterByType: function(n, o) { o = o || 0;
                i.$0(function(p, q) { return q >= o && ss.referenceEquals(p.get_name(), ss.getTypeName(n)) }) }, filterByName: function(n, o) { o = o || 0; var p = new RegExp(n, 'i');
                i.$0(function(q, r) { return r >= o && ss.isValue(q.get_name().match(p)) }) }, clearAppenders: function() { i.$3.splice(0, i.$4.length) }, hasAppender: function(n) { return i.$3.indexOf(n) > -1 }, addAppender: function(n) { for (var o = 0; o < i.$4.length; o++) { var p = i.$4[o];
                    n.addFilter(p) }
                i.$3.push(n) }, removeAppender: function(n) { var o = i.$3.indexOf(n); if (o > -1) { i.$3.splice(o, 1) } }, lazyGetLogger: function(n) { var o = '_logger'; var p = n[o]; if (ss.isNullOrUndefined(p)) { p = i.getLogger(n, null);
                    n[o] = p } return p }, getLogger: function(n, o) { var p = i.getLoggerWithName(ss.getTypeName(n)); if (ss.isValue(o)) {} return p }, getLoggerWithName: function(n) { return i.$6 }, $1: function() { var n = l.getUriQueryParameters(window.self.location.search); if (!ss.keyExists(n, ':log')) { return } var o = n[':log']; if (o.length === 0) {} for (var p = 0; p < o.length; p++) { var q = o[p]; var r = q.split(String.fromCharCode(58)); var s = 1; if (r.length > 0 && ss.isValue(r[1])) { var t = r[1].toLowerCase(); var u = i.loggerLevelNames.indexOf(t); if (u >= 0) { s = u } } } }, $0: function(n) { i.$4.push(n); for (var o = 0; o < i.$3.length; o++) { var p = i.$3[o];
                    p.addFilter(n) } } }); var j = global.tab.LoggerLevel = ss.mkEnum(a, 'tab.LoggerLevel', { all: 0, debug: 1, info: 2, warn: 3, error: 4, off: 5 }); var k = global.tab.ScriptEx = ss.mkType(a, 'tab.ScriptEx'); var l = global.tab.UriExtensions = ss.mkType(a, 'tab.UriExtensions', null, null, { getUriQueryParameters: function(n) { var o = {}; if (ss.isNullOrUndefined(n)) { return o } var p = n.indexOf('?'); if (p < 0) { return o } var q = n.substr(p + 1); var r = q.indexOf('#'); if (r >= 0) { q = q.substr(0, r) } if (ss.isNullOrEmptyString(q)) { return o } var s = q.split('&'); for (var t = 0; t < s.length; t++) { var u = s[t]; var v = u.split('='); var w = decodeURIComponent(v[0]); var x; if (ss.keyExists(o, w)) { x = o[w] } else { x = [];
                        o[w] = x } if (v.length > 1) { x.push(decodeURIComponent(v[1])) } } return o } }); var m = global.tab.WindowHelper = ss.mkType(a, 'tab.WindowHelper', function(n) { this.$0 = null;
            this.$0 = n }, { get_pageXOffset: function() { return m.$9(this.$0) }, get_pageYOffset: function() { return m.$a(this.$0) }, get_clientWidth: function() { return m.$4(this.$0) }, get_clientHeight: function() { return m.$3(this.$0) }, get_innerWidth: function() { return m.$6(this.$0) }, get_outerWidth: function() { return m.$8(this.$0) }, get_innerHeight: function() { return m.$5(this.$0) }, get_outerHeight: function() { return m.$7(this.$0) }, get_screenLeft: function() { return m.$b(this.$0) }, get_screenTop: function() { return m.$c(this.$0) }, isQuirksMode: function() { return document.compatMode === 'BackCompat' } }, { get_windowSelf: function() { return window.self }, get_windowParent: function() { return window.parent }, get_selection: function() { if (typeof(window['getSelection']) === 'function') { return window.getSelection() } if (typeof(document['getSelection']) === 'function') { return document.getSelection() } return null }, close: function(n) { n.close() }, getOpener: function(n) { return n.opener }, getLocation: function(n) { return n.location }, getPathAndSearch: function(n) { return n.location.pathname + n.location.search }, setLocationHref: function(n, o) { n.location.href = o }, locationReplace: function(n, o) { n.location.replace(o) }, open: function(n, o, p) { return window.open(n, o, p) }, reload: function(n, o) { n.location.reload(o) }, requestAnimationFrame: function(n) { return m.$d(n) }, cancelAnimationFrame: function(n) { if (ss.isValue(n)) { m.$2(n) } }, setTimeout: function(n, o) { return window.setTimeout(n, o) }, setInterval: function(n, o) { return window.setInterval(n, o) }, addListener: function(n, o, p) { if ('addEventListener' in n) { n.addEventListener(o, p, false) } else { n.attachEvent('on' + o, p) } }, removeListener: function(n, o, p) { if ('removeEventListener' in n) { n.removeEventListener(o, p, false) } else { n.detachEvent('on' + o, p) } }, $0: function() { var n = 0;
                m.$d = function(o) { var p = (new Date).getTime(); var q = Math.max(0, 16 - (p - n));
                    n = p + q; var r = window.setTimeout(o, q); return r } }, clearSelection: function() { var n = m.get_selection(); if (ss.isValue(n)) { if (typeof(n['removeAllRanges']) === 'function') { n.removeAllRanges() } else if (typeof(n['empty']) === 'function') { n['empty']() } } } });
        ss.initClass(b);
        ss.initClass(c, b);
        ss.initClass(d);
        ss.initClass(e);
        ss.initClass(f);
        ss.initClass(g);
        ss.initClass(h);
        ss.initClass(i);
        ss.initClass(k);
        ss.initClass(l);
        ss.initClass(m);
        (function() { i.global = i.getLoggerWithName('global');
            i.loggerLevelNames = [];
            i.$5 = ':log';
            i.$3 = [];
            i.$4 = [];
            i.$6 = new i('');
            i.loggerLevelNames[0] = 'all';
            i.loggerLevelNames[1] = 'debug';
            i.loggerLevelNames[2] = 'info';
            i.loggerLevelNames[3] = 'warn';
            i.loggerLevelNames[4] = 'error';
            i.loggerLevelNames[5] = 'off' })();
        (function() { c.globalAppender = new h(function() { return new c }) })();
        (function() { m.blank = '_blank';
            m.$6 = null;
            m.$5 = null;
            m.$4 = null;
            m.$3 = null;
            m.$9 = null;
            m.$a = null;
            m.$b = null;
            m.$c = null;
            m.$8 = null;
            m.$7 = null;
            m.$d = null;
            m.$2 = null; if ('innerWidth' in window) { m.$6 = function(v) { return v.innerWidth } } else { m.$6 = function(v) { return v.document.documentElement.offsetWidth } } if ('outerWidth' in window) { m.$8 = function(v) { return v.outerWidth } } else { m.$8 = m.$6 } if ('innerHeight' in window) { m.$5 = function(v) { return v.innerHeight } } else { m.$5 = function(v) { return v.document.documentElement.offsetHeight } } if ('outerHeight' in window) { m.$7 = function(v) { return v.outerHeight } } else { m.$7 = m.$5 } if ('clientWidth' in window) { m.$4 = function(v) { return v['clientWidth'] } } else { m.$4 = function(v) { return v.document.documentElement.clientWidth } } if ('clientHeight' in window) { m.$3 = function(v) { return v['clientHeight'] } } else { m.$3 = function(v) { return v.document.documentElement.clientHeight } } if (ss.isValue(window.self.pageXOffset)) { m.$9 = function(v) { return v.pageXOffset } } else { m.$9 = function(v) { return v.document.documentElement.scrollLeft } } if (ss.isValue(window.self.pageYOffset)) { m.$a = function(v) { return v.pageYOffset } } else { m.$a = function(v) { return v.document.documentElement.scrollTop } } if ('screenLeft' in window) { m.$b = function(v) { return v.screenLeft } } else { m.$b = function(v) { return v.screenX } } if ('screenTop' in window) { m.$c = function(v) { return v.screenTop } } else { m.$c = function(v) { return v.screenY } } { var n = 'requestAnimationFrame'; var o = 'cancelAnimationFrame'; var p = ['ms', 'moz', 'webkit', 'o']; var q = null; var r = null; if (n in window) { q = n } if (o in window) { r = o } for (var s = 0; s < p.length && (ss.isNullOrUndefined(q) || ss.isNullOrUndefined(r)); ++s) { var t = p[s]; var u = t + 'RequestAnimationFrame'; if (ss.isNullOrUndefined(q) && u in window) { q = u } if (ss.isNullOrUndefined(r)) { u = t + 'CancelAnimationFrame'; if (u in window) { r = u }
                        u = t + 'CancelRequestAnimationFrame'; if (u in window) { r = u } } } if (ss.isValue(q)) { m.$d = function(v) { return window[q](v) } } else { m.$0() } if (ss.isValue(r)) { m.$2 = function(v) { window[r](v) } } else { m.$2 = window.clearTimeout } } })() })();
    var tab = global.tab;
    global.tableauSoftware = global.tableauSoftware || {};
    /*! BEGIN ApiShared */
    (function() { 'dont use strict'; var a = {};
        global.tab = global.tab || {};
        global.tableauSoftware = global.tableauSoftware || {};
        ss.initAssembly(a, 'vqlapishared'); var b = global.tab._ApiCommand = ss.mkType(a, 'tab._ApiCommand', function(e, bi, bj, bk) { this.$1$1 = null;
            this.$1$2 = null;
            this.$1$3 = null;
            this.$1$4 = null;
            this.set_name(e);
            this.set_commandId(bi);
            this.set_hostId(bj);
            this.set_parameters(bk) }, { get_name: function() { return this.$1$1 }, set_name: function(e) { this.$1$1 = e }, get_hostId: function() { return this.$1$2 }, set_hostId: function(e) { this.$1$2 = e }, get_commandId: function() { return this.$1$3 }, set_commandId: function(e) { this.$1$3 = e }, get_parameters: function() { return this.$1$4 }, set_parameters: function(e) { this.$1$4 = e }, get_isApiCommandName: function() { return this.get_rawName().indexOf('api.', 0) === 0 }, get_rawName: function() { return this.get_name().toString() }, serialize: function() { var e = [];
                e.push(this.get_name());
                e.push(this.get_commandId());
                e.push(this.get_hostId()); if (ss.isValue(this.get_parameters())) { e.push(this.get_parameters()) } var bi = e.join(','); return bi } }, { generateNextCommandId: function() { var e = 'cmd' + b.$0;
                b.$0++; return e }, parse: function(e) { var bi; var bj = e.indexOf(String.fromCharCode(44)); if (bj < 0) { bi = e; return new b(bi, null, null, null) }
                bi = e.substr(0, bj); var bk; var bl = e.substr(bj + 1);
                bj = bl.indexOf(String.fromCharCode(44)); if (bj < 0) { bk = bl; return new b(bi, bk, null, null) }
                bk = bl.substr(0, bj); var bm; var bn = bl.substr(bj + 1);
                bj = bn.indexOf(String.fromCharCode(44)); if (bj < 0) { bm = bn; return new b(bi, bk, bm, null) }
                bm = bn.substr(0, bj); var bo = bn.substr(bj + 1); return new b(bi, bk, bm, bo) } }); var c = global.tab._ApiObjectRegistry = ss.mkType(a, 'tab._ApiObjectRegistry', null, null, { registerApiMessageRouter: function(e) { return c.$3(Object).call(null, e) }, getApiMessageRouter: function() { return c.$2(Object).call(null) }, disposeApiMessageRouter: function() { c.$0(Object).call(null) }, $3: function(e) { return function(bi) { var bj = window._ApiObjectRegistryGlobalState.creationRegistry; var bk = ss.getTypeFullName(e); var bl = bj[bk];
                    bj[bk] = bi; return bl } }, $1: function(e) { return function() { var bi = ss.getTypeFullName(e); var bj = window._ApiObjectRegistryGlobalState.creationRegistry; var bk = bj[bi]; if (ss.isNullOrUndefined(bk)) { throw o.createInternalError("No creation function has been registered for interface type '" + bi + "'.") } var bl = bk(); return bl } }, $2: function(e) { return function() { var bi = window._ApiObjectRegistryGlobalState.singletonInstanceRegistry; var bj = ss.getTypeFullName(e); var bk = bi[bj]; if (ss.isNullOrUndefined(bk)) { bk = c.$1(e).call(null);
                        bi[bj] = bk } return bk } }, $0: function(e) { return function() { var bi = window._ApiObjectRegistryGlobalState.singletonInstanceRegistry; var bj = ss.getTypeFullName(e); var bk = bi[bj];
                    delete bi[bj]; return bk } } }); var d = global.tab._ApiServerNotification = ss.mkType(a, 'tab._ApiServerNotification', function(e, bi, bj) { this.$1 = null;
            this.$2 = null;
            this.$0 = null;
            this.$1 = e;
            this.$2 = bi;
            this.$0 = bj }, { get_workbookName: function() { return this.$1 }, get_worksheetName: function() { return this.$2 }, get_data: function() { return this.$0 }, serialize: function() { var e = {};
                e['api.workbookName'] = this.$1;
                e['api.worksheetName'] = this.$2;
                e['api.commandData'] = this.$0; return JSON.stringify(e) } }, { deserialize: function(e) { var bi = JSON.parse(e); var bj = bi['api.workbookName']; var bk = bi['api.worksheetName']; var bl = bi['api.commandData']; return new d(bj, bk, bl) } }); var f = global.tab._ApiServerResultParser = ss.mkType(a, 'tab._ApiServerResultParser', function(e) { this.$1 = null;
            this.$0 = null; var bi = JSON.parse(e);
            this.$1 = bi['api.commandResult'];
            this.$0 = bi['api.commandData'] }, { get_result: function() { return this.$1 }, get_data: function() { return this.$0 } }); var g = global.tab._CollectionImpl = ss.mkType(a, 'tab._CollectionImpl', function() { this.$4 = [];
            this.$3 = {} }, { get__length: function() { return this.$4.length }, get__rawArray: function() { return this.$4 }, get_item: function(e) { return this.$4[e] }, _get: function(e) { var bi = this.$0(e); if (ss.isValue(this.$3[bi])) { return this.$3[bi] } return undefined }, _has: function(e) { return ss.isValue(this._get(e)) }, _add: function(e, bi) { this.$1(e, bi); var bj = this.$0(e);
                this.$4.push(bi);
                this.$3[bj] = bi }, _addToFirst: function(e, bi) { this.$1(e, bi); var bj = this.$0(e);
                this.$4.unshift(bi);
                this.$3[bj] = bi }, _remove: function(e) { var bi = this.$0(e); if (ss.isValue(this.$3[bi])) { var bj = this.$3[bi];
                    delete this.$3[bi]; for (var bk = 0; bk < this.$4.length; bk++) { if (ss.referenceEquals(this.$4[bk], bj)) { this.$4.splice(bk, 1); break } } } }, _toApiCollection: function() { var e = this.$4.concat();
                e.get = ss.mkdel(this, function(bi) { return this._get(bi) });
                e.has = ss.mkdel(this, function(bi) { return this._has(bi) }); return e }, $2: function(e) { if (p.isNullOrEmpty(e)) { throw new ss.Exception('Null key') } if (this._has(e)) { throw new ss.Exception("Duplicate key '" + e + "'") } }, $1: function(e, bi) { this.$2(e); if (ss.isNullOrUndefined(bi)) { throw new ss.Exception('Null item') } }, $0: function(e) { return '_' + e } }); var h = global.tab._ColumnImpl = ss.mkType(a, 'tab._ColumnImpl', function(e, bi, bj, bk) { this.$1 = null;
            this.$0 = null;
            this.$3 = false;
            this.$2 = 0;
            l.verifyString(e, 'Column Field Name');
            this.$1 = e;
            this.$0 = bi;
            this.$3 = ss.coalesce(bj, false);
            this.$2 = bk }, { get_fieldName: function() { return this.$1 }, get_dataType: function() { return this.$0 }, get_isReferenced: function() { return this.$3 }, get_index: function() { return this.$2 } }); var i = global.tab._DataTableImpl = ss.mkType(a, 'tab._DataTableImpl', function(e, bi, bj, bk) { this.$2 = null;
            this.$3 = null;
            this.$4 = 0;
            this.$0 = null;
            this.$1 = false;
            this.$3 = e;
            this.$4 = bj;
            this.$0 = bk;
            this.$1 = bi;
            this.$2 = (bi ? 'Summary Data Table' : 'Underlying Data Table') }, { get_name: function() { return this.$2 }, get_rows: function() { return this.$3 }, get_columns: function() { return this.$0 }, get_totalRowCount: function() { return this.$4 }, get_isSummaryData: function() { return this.$1 } }); var j = global.tab._DeferredImpl = ss.mkType(a, 'tab._DeferredImpl', function() { this.$3 = null;
            this.$5 = null;
            this.$2 = [];
            this.$4 = null;
            this.$3 = new m(ss.mkdel(this, this.then));
            this.$5 = ss.mkdel(this, this.$0);
            this.$4 = ss.mkdel(this, this.$1) }, { get_promise: function() { return this.$3 }, all: function(e) { var bi = new j; var bj = e.length; var bk = bj; var bl = []; if (bj === 0) { bi.resolve(bl); return bi.get_promise() } var bm = function(bo, bp) { var bq = r.$0(bo);
                    bq.then(function(br) { bl[bp] = br;
                        bk--; if (bk === 0) { bi.resolve(bl) } return null }, function(br) { bi.reject(br); return null }) }; for (var bn = 0; bn < bj; bn++) { bm(e[bn], bn) } return bi.get_promise() }, then: function(e, bi) { return this.$5(e, bi) }, resolve: function(e) { return this.$4(e) }, reject: function(e) { return this.$4(r.$3(e)) }, $0: function(e, bi) { var bj = new j;
                this.$2.push(function(bk) { bk.then(e, bi).then(ss.mkdel(bj, bj.resolve), ss.mkdel(bj, bj.reject)) }); return bj.get_promise() }, $1: function(e) { var bi = r.$0(e);
                this.$5 = bi.then;
                this.$4 = r.$0; for (var bj = 0; bj < this.$2.length; bj++) { var bk = this.$2[bj];
                    bk(bi) }
                this.$2 = null; return bi } }); var k = global.tab._jQueryShim = ss.mkType(a, 'tab._jQueryShim', null, null, { isFunction: function(e) { return k.type(e) === 'function' }, isArray: function(e) { if (ss.isValue(Array['isArray'])) { return Array['isArray'](e) } return k.type(e) === 'array' }, type: function(e) { return (ss.isNullOrUndefined(e) ? String(e) : (k.$9[k.$e.call(e)] || 'object')) }, trim: function(e) { if (ss.isValue(k.$f)) { return (ss.isNullOrUndefined(e) ? '' : k.$f.call(e)) } return (ss.isNullOrUndefined(e) ? '' : e.toString().replace(k.$g, '').replace(k.$h, '')) }, parseJSON: function(e) { if (typeof(e) !== 'string' || ss.isNullOrUndefined(e)) { return null }
                e = k.trim(e); if (ss.isValue(JSON) && ss.isValue(JSON['parse'])) { return JSON.parse(e) } if (k.$b.test(e.replace(k.$c, '@').replace(k.$d, ']').replace(k.$a, ''))) { return (new Function('return ' + e))() } throw new ss.Exception('Invalid JSON: ' + e) } }); var l = global.tab._Param = ss.mkType(a, 'tab._Param', null, null, { verifyString: function(e, bi) { if (ss.isNullOrUndefined(e) || e.length === 0) { throw o.createInternalStringArgumentException(bi) } }, verifyValue: function(e, bi) { if (ss.isNullOrUndefined(e)) { throw o.createInternalNullArgumentException(bi) } } }); var m = global.tab._PromiseImpl = ss.mkType(a, 'tab._PromiseImpl', function(e) { this.then = null;
            this.then = e }, { always: function(e) { return this.then(e, e) }, otherwise: function(e) { return this.then(null, e) } }); var n = global.tab._Rect = ss.mkType(a, 'tab._Rect', function(e, bi, bj, bk) { this.left = 0;
            this.top = 0;
            this.width = 0;
            this.height = 0;
            this.left = e;
            this.top = bi;
            this.width = bj;
            this.height = bk }, { intersect: function(e) { var bi = Math.max(this.left, e.left); var bj = Math.max(this.top, e.top); var bk = Math.min(this.left + this.width, e.left + e.width); var bl = Math.min(this.top + this.height, e.top + e.height); if (bk <= bi || bl <= bj) { return new n(0, 0, 0, 0) } return new n(bi, bj, bk - bi, bl - bj) } }); var o = global.tab._TableauException = ss.mkType(a, 'tab._TableauException', null, null, { create: function(e, bi) { var bj = new ss.Exception(bi);
                bj['tableauSoftwareErrorCode'] = e; return bj }, createInternalError: function(e) { if (ss.isValue(e)) { return o.create('internalError', 'Internal error. Please contact Tableau support with the following information: ' + e) } else { return o.create('internalError', 'Internal error. Please contact Tableau support') } }, createInternalNullArgumentException: function(e) { return o.createInternalError("Null/undefined argument '" + e + "'.") }, createInternalStringArgumentException: function(e) { return o.createInternalError("Invalid string argument '" + e + "'.") }, createServerError: function(e) { return o.create('serverError', e) }, createNotActiveSheet: function() { return o.create('notActiveSheet', 'Operation not allowed on non-active sheet') }, createInvalidCustomViewName: function(e) { return o.create('invalidCustomViewName', 'Invalid custom view name: ' + e) }, createInvalidParameter: function(e) { return o.create('invalidParameter', 'Invalid parameter: ' + e) }, createInvalidFilterFieldNameOrValue: function(e) { return o.create('invalidFilterFieldNameOrValue', 'Invalid filter field name or value: ' + e) }, createInvalidDateParameter: function(e) { return o.create('invalidDateParameter', 'Invalid date parameter: ' + e) }, createNullOrEmptyParameter: function(e) { return o.create('nullOrEmptyParameter', 'Parameter cannot be null or empty: ' + e) }, createMissingMaxSize: function() { return o.create('missingMaxSize', 'Missing maxSize for SheetSizeBehavior.ATMOST') }, createMissingMinSize: function() { return o.create('missingMinSize', 'Missing minSize for SheetSizeBehavior.ATLEAST') }, createMissingMinMaxSize: function() { return o.create('missingMinMaxSize', 'Missing minSize or maxSize for SheetSizeBehavior.RANGE') }, createInvalidRangeSize: function() { return o.create('invalidSize', 'Missing minSize or maxSize for SheetSizeBehavior.RANGE') }, createInvalidSizeValue: function() { return o.create('invalidSize', 'Size value cannot be less than zero') }, createInvalidSheetSizeParam: function() { return o.create('invalidSize', 'Invalid sheet size parameter') }, createSizeConflictForExactly: function() { return o.create('invalidSize', 'Conflicting size values for SheetSizeBehavior.EXACTLY') }, createInvalidSizeBehaviorOnWorksheet: function() { return o.create('invalidSizeBehaviorOnWorksheet', 'Only SheetSizeBehavior.AUTOMATIC is allowed on Worksheets') }, createNoUrlForHiddenWorksheet: function() { return o.create('noUrlForHiddenWorksheet', 'Hidden worksheets do not have a URL.') }, createInvalidAggregationFieldName: function(e) { return o.create('invalidAggregationFieldName', "Invalid aggregation type for field '" + e + "'") }, createInvalidToolbarButtonName: function(e) { return o.create('invalidToolbarButtonName', "Invalid toolbar button name: '" + e + "'") }, createIndexOutOfRange: function(e) { return o.create('indexOutOfRange', "Index '" + e + "' is out of range.") }, createUnsupportedEventName: function(e) { return o.create('unsupportedEventName', "Unsupported event '" + e + "'.") }, createBrowserNotCapable: function() { return o.create('browserNotCapable', 'This browser is incapable of supporting the Tableau JavaScript API.') } }); var p = global.tab._Utility = ss.mkType(a, 'tab._Utility', null, null, { isNullOrEmpty: function(e) { return ss.isNullOrUndefined(e) || (e['length'] || 0) <= 0 }, isString: function(e) { return typeof(e) === 'string' }, isNumber: function(e) { return typeof(e) === 'number' }, isDate: function(e) { if (typeof(e) === 'object' && ss.isInstanceOfType(e, ss.JsDate)) { return true } else if (Object.prototype.toString.call(e) !== '[object Date]') { return false } return !isNaN(e.getTime()) }, isDateValid: function(e) { return !isNaN(e.getTime()) }, indexOf: function(e, bi, bj) { if (ss.isValue(Array.prototype['indexOf'])) { return e['indexOf'](bi, bj) }
                bj = bj || 0; var bk = e.length; if (bk > 0) { for (var bl = bj; bl < bk; bl++) { if (ss.referenceEquals(e[bl], bi)) { return bl } } } return -1 }, contains: function(e, bi, bj) { var bk = p.indexOf(e, bi, bj); return bk >= 0 }, getTopmostWindow: function() { var e = window.self; while (ss.isValue(e.parent) && !ss.referenceEquals(e.parent, e)) { e = e.parent } return e }, toInt: function(e) { if (p.isNumber(e)) { return ss.trunc(e) } var bi = parseInt(e.toString(), 10); if (isNaN(bi)) { return 0 } return bi }, hasClass: function(e, bi) { var bj = new RegExp('[\\n\\t\\r]', 'g'); return ss.isValue(e) && (' ' + e.className + ' ').replace(bj, ' ').indexOf(' ' + bi + ' ') > -1 }, findParentWithClassName: function(e, bi, bj) { var bk = (ss.isValue(e) ? e.parentNode : null);
                bj = bj || document.body; while (ss.isValue(bk)) { if (p.hasClass(bk, bi)) { return bk } if (ss.referenceEquals(bk, bj)) { bk = null } else { bk = bk.parentNode } } return bk }, hasJsonParse: function() { return ss.isValue(JSON) && ss.isValue(JSON.parse) }, hasWindowPostMessage: function() { return ss.isValue(window.postMessage) }, isPostMessageSynchronous: function() { if (p.isIE()) { var e = new RegExp('(msie) ([\\w.]+)'); var bi = e.exec(window.navigator.userAgent.toLowerCase()); var bj = bi[2] || '0'; var bk = parseInt(bj, 10); return bk <= 8 } return false }, hasDocumentAttachEvent: function() { return ss.isValue(document.attachEvent) }, hasWindowAddEventListener: function() { return ss.isValue(window.addEventListener) }, isElementOfTag: function(e, bi) { return ss.isValue(e) && e.nodeType === 1 && ss.referenceEquals(e.tagName.toLowerCase(), bi.toLowerCase()) }, elementToString: function(e) { var bi = new ss.StringBuilder;
                bi.append(e.tagName.toLowerCase()); if (!p.isNullOrEmpty(e.id)) { bi.append('#').append(e.id) } if (!p.isNullOrEmpty(e.className)) { var bj = e.className.split(' ');
                    bi.append('.').append(bj.join('.')) } return bi.toString() }, tableauGCS: function(e) { if (typeof(window['getComputedStyle']) === 'function') { return window.getComputedStyle(e) } else { return e['currentStyle'] } }, isIE: function() { return window.navigator.userAgent.indexOf('MSIE') > -1 && ss.isNullOrUndefined(window.opera) }, isSafari: function() { var e = window.navigator.userAgent; var bi = e.indexOf('Chrome') >= 0; return e.indexOf('Safari') >= 0 && !bi }, mobileDetect: function() { var e = window.navigator.userAgent; if (e.indexOf('iPad') !== -1) { return true } if (e.indexOf('Android') !== -1) { return true } if (e.indexOf('AppleWebKit') !== -1 && e.indexOf('Mobile') !== -1) { return true } return false }, visibleContentRectInDocumentCoordinates: function(e) { var bi = p.contentRectInDocumentCoordinates(e); for (var bj = e.parentElement; ss.isValue(bj) && ss.isValue(bj.parentElement); bj = bj.parentElement) { var bk = p.$0(bj).overflow; if (bk === 'auto' || bk === 'scroll' || bk === 'hidden') { bi = bi.intersect(p.contentRectInDocumentCoordinates(bj)) } } var bl = p.$1(); return bi.intersect(bl) }, getVisualViewportRect: function(e) { var bi = e.visualViewport; if (ss.isValue(bi)) { return new n(ss.trunc(bi.pageLeft), ss.trunc(bi.pageTop), ss.trunc(bi.width), ss.trunc(bi.height)) } else { return null } }, $1: function() { var e = p.getVisualViewportRect(window.self); if (ss.isValue(e)) { return e } else { var bi = p.contentRectInDocumentCoordinates(document.documentElement); var bj = new tab.WindowHelper(window.self); if (bj.isQuirksMode()) { bi.height = document.body.clientHeight - bi.left;
                        bi.width = document.body.clientWidth - bi.top }
                    bi.left += bj.get_pageXOffset();
                    bi.top += bj.get_pageYOffset(); return bi } }, contentRectInDocumentCoordinates: function(e) { var bi = p.getBoundingClientRect(e); var bj = p.$0(e); var bk = p.toInt(bj.paddingLeft); var bl = p.toInt(bj.paddingTop); var bm = p.toInt(bj.borderLeftWidth); var bn = p.toInt(bj.borderTopWidth); var bo = p.computeContentSize(e); var bp = new tab.WindowHelper(window.self); var bq = bi.left + bk + bm + bp.get_pageXOffset(); var br = bi.top + bl + bn + bp.get_pageYOffset(); return new n(bq, br, bo.width, bo.height) }, getBoundingClientRect: function(e) { var bi = e.getBoundingClientRect(); var bj = ss.trunc(bi.top); var bk = ss.trunc(bi.left); var bl = ss.trunc(bi.right); var bm = ss.trunc(bi.bottom); return new n(bk, bj, bl - bk, bm - bj) }, convertRawValue: function(e, bi) { if (ss.isNullOrUndefined(e)) { return null } switch (bi) {
                    case 'bool':
                        { return e }
                    case 'date':
                    case 'number':
                        { if (ss.isNullOrUndefined(e)) { return Number.NaN } return e }
                    default:
                    case 'string':
                        { return e } } }, getDataValue: function(e) { if (ss.isNullOrUndefined(e)) { return Q.$ctor(null, null, null) } return Q.$ctor(p.convertRawValue(e.value, e.type), e.formattedValue, e.aliasedValue) }, serializeDateForServer: function(e) { var bi = ''; if (ss.isValue(e) && p.isDate(e)) { var bj = e.getUTCFullYear(); var bk = e.getUTCMonth() + 1; var bl = e.getUTCDate(); var bm = e.getUTCHours(); var bn = e.getUTCMinutes(); var bo = e.getUTCSeconds();
                    bi = bj + '-' + bk + '-' + bl + ' ' + bm + ':' + bn + ':' + bo } return bi }, computeContentSize: function(e) { var bi = p.$0(e); var bj = parseFloat(bi.paddingLeft); var bk = parseFloat(bi.paddingTop); var bl = parseFloat(bi.paddingRight); var bm = parseFloat(bi.paddingBottom); var bn = e.clientWidth - Math.round(bj + bl); var bo = e.clientHeight - Math.round(bk + bm); return bc.$ctor(bn, bo) }, $0: function(e) { if (typeof(window['getComputedStyle']) === 'function') { if (ss.isValue(e.ownerDocument.defaultView.opener)) { return e.ownerDocument.defaultView.getComputedStyle(e) } return window.getComputedStyle(e) } else if (ss.isValue(e['currentStyle'])) { return e['currentStyle'] } return e.style }, roundVizSizeInPixels: function(e) { if (ss.isNullOrUndefined(e) || !(e.indexOf('px') !== -1)) { return e } var bi = parseFloat(e.split('px')[0]); return Math.round(bi) + 'px' }, noResultPromiseHelper: function(e, bi, bj) { var bk = new tab._Deferred; var bl = new(ss.makeGenericType(N, [Object]))(e, 1, function(bm) { bk.resolve() }, function(bm, bn) { bk.reject(o.createServerError(bn)) });
                bj.sendCommand(Object).call(bj, bi, bl); return bk.get_promise() }, clone: function(e) { return function(bi) { return JSON.parse(JSON.stringify(bi)) } } }); var q = ss.mkType(a, 'tab.$0', function() { this.$2 = null;
            this.$1$1 = null }, { add_stateReadyForQuery: function(e) { this.$1$1 = ss.delegateCombine(this.$1$1, e) }, remove_stateReadyForQuery: function(e) { this.$1$1 = ss.delegateRemove(this.$1$1, e) }, get_iframe: function() { return null }, get_hostId: function() { return this.$2 }, set_hostId: function(e) { this.$2 = e }, $0: function() { return '*' }, handleEventNotification: function(e, bi) {}, $1: function() { this.$1$1(null) } }); var r = ss.mkType(a, 'tab.$1', null, null, { $0: function(e) { var bi; if (e instanceof tableauSoftware.Promise) { bi = e } else { if (ss.isValue(e) && typeof(e['valueOf']) === 'function') { e = e['valueOf']() } if (r.$1(e)) { var bj = new j;
                        e.then(ss.mkdel(bj, bj.resolve), ss.mkdel(bj, bj.reject));
                        bi = bj.get_promise() } else { bi = r.$4(e) } } return bi }, $2: function(e) { return r.$0(e).then(function(bi) { return r.$3(bi) }, null) }, $4: function(bi) { var bj = new m(function(bk, bl) { try { return r.$0((ss.isValue(bk) ? bk(bi) : bi)) } catch (bm) { var e = ss.Exception.wrap(bm); return r.$3(e) } }); return bj }, $3: function(bi) { var bj = new m(function(bk, bl) { try { return (ss.isValue(bl) ? r.$0(bl(bi)) : r.$3(bi)) } catch (bm) { var e = ss.Exception.wrap(bm); return r.$3(e) } }); return bj }, $1: function(e) { return ss.isValue(e) && typeof(e['then']) === 'function' } }); var s = global.tab.ApiDashboardObjectType = ss.mkEnum(a, 'tab.ApiDashboardObjectType', { blank: 'blank', worksheet: 'worksheet', quickFilter: 'quickFilter', parameterControl: 'parameterControl', pageFilter: 'pageFilter', legend: 'legend', title: 'title', text: 'text', image: 'image', webPage: 'webPage', addIn: 'addIn' }, true); var t = global.tab.ApiDateRangeType = ss.mkEnum(a, 'tab.ApiDateRangeType', { last: 'last', lastn: 'lastn', next: 'next', nextn: 'nextn', curr: 'curr', todate: 'todate' }, true); var u = global.tab.ApiDeviceType = ss.mkEnum(a, 'tab.ApiDeviceType', { default: 'default', desktop: 'desktop', tablet: 'tablet', phone: 'phone' }, true); var v = global.tab.ApiEnumConverter = ss.mkType(a, 'tab.ApiEnumConverter', null, null, { convertDashboardObjectType: function(e) { switch (e) {
                    case 'blank':
                        { return 'blank' }
                    case 'image':
                        { return 'image' }
                    case 'legend':
                        { return 'legend' }
                    case 'pageFilter':
                        { return 'pageFilter' }
                    case 'parameterControl':
                        { return 'parameterControl' }
                    case 'quickFilter':
                        { return 'quickFilter' }
                    case 'text':
                        { return 'text' }
                    case 'title':
                        { return 'title' }
                    case 'webPage':
                        { return 'webPage' }
                    case 'worksheet':
                        { return 'worksheet' }
                    default:
                        { throw o.createInternalError('Unknown ApiCrossDomainDashboardObjectType: ' + e) } } }, convertDateRange: function(e) { switch (e) {
                    case 'curr':
                        { return 'curr' }
                    case 'last':
                        { return 'last' }
                    case 'lastn':
                        { return 'lastn' }
                    case 'next':
                        { return 'next' }
                    case 'nextn':
                        { return 'nextn' }
                    case 'todate':
                        { return 'todate' }
                    default:
                        { throw o.createInternalError('Unknown ApiCrossDomainDateRangeType: ' + e) } } }, convertFieldAggregation: function(e) { switch (e) {
                    case 'ATTR':
                        { return 'ATTR' }
                    case 'AVG':
                        { return 'AVG' }
                    case 'COLLECT':
                        { return 'COLLECT' }
                    case 'COUNT':
                        { return 'COUNT' }
                    case 'COUNTD':
                        { return 'COUNTD' }
                    case 'DAY':
                        { return 'DAY' }
                    case 'END':
                        { return 'END' }
                    case 'HOUR':
                        { return 'HOUR' }
                    case 'INOUT':
                        { return 'INOUT' }
                    case 'KURTOSIS':
                        { return 'KURTOSIS' }
                    case 'MAX':
                        { return 'MAX' }
                    case 'MDY':
                        { return 'MDY' }
                    case 'MEDIAN':
                        { return 'MEDIAN' }
                    case 'MIN':
                        { return 'MIN' }
                    case 'MINUTE':
                        { return 'MINUTE' }
                    case 'MONTH':
                        { return 'MONTH' }
                    case 'MONTHYEAR':
                        { return 'MONTHYEAR' }
                    case 'NONE':
                        { return 'NONE' }
                    case 'PERCENTILE':
                        { return 'PERCENTILE' }
                    case 'QUART1':
                        { return 'QUART1' }
                    case 'QUART3':
                        { return 'QUART3' }
                    case 'QTR':
                        { return 'QTR' }
                    case 'SECOND':
                        { return 'SECOND' }
                    case 'SKEWNESS':
                        { return 'SKEWNESS' }
                    case 'STDEV':
                        { return 'STDEV' }
                    case 'STDEVP':
                        { return 'STDEVP' }
                    case 'SUM':
                        { return 'SUM' }
                    case 'SUM_XSQR':
                        { return 'SUM_XSQR' }
                    case 'TRUNC_DAY':
                        { return 'TRUNC_DAY' }
                    case 'TRUNC_HOUR':
                        { return 'TRUNC_HOUR' }
                    case 'TRUNC_MINUTE':
                        { return 'TRUNC_MINUTE' }
                    case 'TRUNC_MONTH':
                        { return 'TRUNC_MONTH' }
                    case 'TRUNC_QTR':
                        { return 'TRUNC_QTR' }
                    case 'TRUNC_SECOND':
                        { return 'TRUNC_SECOND' }
                    case 'TRUNC_WEEK':
                        { return 'TRUNC_WEEK' }
                    case 'TRUNC_YEAR':
                        { return 'TRUNC_YEAR' }
                    case 'USER':
                        { return 'USER' }
                    case 'VAR':
                        { return 'VAR' }
                    case 'VARP':
                        { return 'VARP' }
                    case 'WEEK':
                        { return 'WEEK' }
                    case 'WEEKDAY':
                        { return 'WEEKDAY' }
                    case 'YEAR':
                        { return 'YEAR' }
                    default:
                        { throw o.createInternalError('Unknown ApiCrossDomainFieldAggregationType: ' + e) } } }, convertFieldRole: function(e) { switch (e) {
                    case 'dimension':
                        { return 'dimension' }
                    case 'measure':
                        { return 'measure' }
                    case 'unknown':
                        { return 'unknown' }
                    default:
                        { throw o.createInternalError('Unknown ApiCrossDomainFieldRoleType: ' + e) } } }, convertFilterType: function(e) { switch (e) {
                    case 'categorical':
                        { return 'categorical' }
                    case 'hierarchical':
                        { return 'hierarchical' }
                    case 'quantitative':
                        { return 'quantitative' }
                    case 'relativedate':
                        { return 'relativedate' }
                    default:
                        { throw o.createInternalError('Unknown ApiCrossDomainFilterType: ' + e) } } }, convertParameterAllowableValuesType: function(e) { switch (e) {
                    case 'all':
                        { return 'all' }
                    case 'list':
                        { return 'list' }
                    case 'range':
                        { return 'range' }
                    default:
                        { throw o.createInternalError('Unknown ApiCrossDomainParameterAllowableValuesType: ' + e) } } }, convertParameterDataType: function(e) { switch (e) {
                    case 'boolean':
                        { return 'boolean' }
                    case 'date':
                        { return 'date' }
                    case 'datetime':
                        { return 'datetime' }
                    case 'float':
                        { return 'float' }
                    case 'integer':
                        { return 'integer' }
                    case 'string':
                        { return 'string' }
                    default:
                        { throw o.createInternalError('Unknown ApiCrossDomainParameterDataType: ' + e) } } }, convertPeriodType: function(e) { switch (e) {
                    case 'year':
                        { return 'year' }
                    case 'quarter':
                        { return 'quarter' }
                    case 'month':
                        { return 'month' }
                    case 'week':
                        { return 'week' }
                    case 'day':
                        { return 'day' }
                    case 'hour':
                        { return 'hour' }
                    case 'minute':
                        { return 'minute' }
                    case 'second':
                        { return 'second' }
                    default:
                        { throw o.createInternalError('Unknown ApiCrossDomainPeriodType: ' + e) } } }, convertSheetType: function(e) { switch (e) {
                    case 'worksheet':
                        { return 'worksheet' }
                    case 'dashboard':
                        { return 'dashboard' }
                    case 'story':
                        { return 'story' }
                    default:
                        { throw o.createInternalError('Unknown ApiCrossDomainSheetType: ' + e) } } }, convertDataType: function(e) { switch (e) {
                    case 'boolean':
                        { return 'boolean' }
                    case 'date':
                        { return 'date' }
                    case 'datetime':
                        { return 'datetime' }
                    case 'float':
                        { return 'float' }
                    case 'integer':
                        { return 'integer' }
                    case 'string':
                        { return 'string' }
                    default:
                        { throw o.createInternalError('Unknown ApiCrossDomainParameterDataType: ' + e) } } } }); var w = global.tab.ApiErrorCode = ss.mkEnum(a, 'tab.ApiErrorCode', { internalError: 'internalError', serverError: 'serverError', invalidAggregationFieldName: 'invalidAggregationFieldName', invalidToolbarButtonName: 'invalidToolbarButtonName', invalidParameter: 'invalidParameter', invalidUrl: 'invalidUrl', staleDataReference: 'staleDataReference', vizAlreadyInManager: 'vizAlreadyInManager', noUrlOrParentElementNotFound: 'noUrlOrParentElementNotFound', invalidFilterFieldName: 'invalidFilterFieldName', invalidFilterFieldValue: 'invalidFilterFieldValue', invalidFilterFieldNameOrValue: 'invalidFilterFieldNameOrValue', filterCannotBePerformed: 'filterCannotBePerformed', notActiveSheet: 'notActiveSheet', invalidCustomViewName: 'invalidCustomViewName', missingRangeNForRelativeDateFilters: 'missingRangeNForRelativeDateFilters', missingMaxSize: 'missingMaxSize', missingMinSize: 'missingMinSize', missingMinMaxSize: 'missingMinMaxSize', invalidSize: 'invalidSize', invalidSizeBehaviorOnWorksheet: 'invalidSizeBehaviorOnWorksheet', sheetNotInWorkbook: 'sheetNotInWorkbook', indexOutOfRange: 'indexOutOfRange', downloadWorkbookNotAllowed: 'downloadWorkbookNotAllowed', nullOrEmptyParameter: 'nullOrEmptyParameter', browserNotCapable: 'browserNotCapable', unsupportedEventName: 'unsupportedEventName', invalidDateParameter: 'invalidDateParameter', invalidSelectionFieldName: 'invalidSelectionFieldName', invalidSelectionValue: 'invalidSelectionValue', invalidSelectionDate: 'invalidSelectionDate', noUrlForHiddenWorksheet: 'noUrlForHiddenWorksheet', maxVizResizeAttempts: 'maxVizResizeAttempts' }, true); var x = global.tab.ApiFieldAggregationType = ss.mkEnum(a, 'tab.ApiFieldAggregationType', { SUM: 'SUM', AVG: 'AVG', MIN: 'MIN', MAX: 'MAX', STDEV: 'STDEV', STDEVP: 'STDEVP', VAR: 'VAR', VARP: 'VARP', COUNT: 'COUNT', COUNTD: 'COUNTD', MEDIAN: 'MEDIAN', ATTR: 'ATTR', NONE: 'NONE', PERCENTILE: 'PERCENTILE', YEAR: 'YEAR', QTR: 'QTR', MONTH: 'MONTH', DAY: 'DAY', HOUR: 'HOUR', MINUTE: 'MINUTE', SECOND: 'SECOND', WEEK: 'WEEK', WEEKDAY: 'WEEKDAY', MONTHYEAR: 'MONTHYEAR', MDY: 'MDY', END: 'END', TRUNC_YEAR: 'TRUNC_YEAR', TRUNC_QTR: 'TRUNC_QTR', TRUNC_MONTH: 'TRUNC_MONTH', TRUNC_WEEK: 'TRUNC_WEEK', TRUNC_DAY: 'TRUNC_DAY', TRUNC_HOUR: 'TRUNC_HOUR', TRUNC_MINUTE: 'TRUNC_MINUTE', TRUNC_SECOND: 'TRUNC_SECOND', QUART1: 'QUART1', QUART3: 'QUART3', SKEWNESS: 'SKEWNESS', KURTOSIS: 'KURTOSIS', INOUT: 'INOUT', SUM_XSQR: 'SUM_XSQR', USER: 'USER', COLLECT: 'COLLECT' }, true); var y = global.tab.ApiFieldRoleType = ss.mkEnum(a, 'tab.ApiFieldRoleType', { dimension: 'dimension', measure: 'measure', unknown: 'unknown' }, true); var z = global.tab.ApiFilterType = ss.mkEnum(a, 'tab.ApiFilterType', { categorical: 'categorical', quantitative: 'quantitative', hierarchical: 'hierarchical', relativedate: 'relativedate' }, true); var A = global.tab.ApiFilterUpdateType = ss.mkEnum(a, 'tab.ApiFilterUpdateType', { all: 'all', replace: 'replace', add: 'add', remove: 'remove' }, true); var B = global.tab.ApiMessageHandler = ss.mkType(a, 'tab.ApiMessageHandler', function() {}, { handleEventNotification: function(e, bi) { throw new ss.NotImplementedException } }); var C = global.tab.ApiMessagingOptions = ss.mkType(a, 'tab.ApiMessagingOptions', function(e, bi) { this.$1 = null;
            this.$0 = null;
            l.verifyValue(e, 'router');
            this.$1 = e;
            this.$0 = bi }, { get_handler: function() { return this.$0 }, get_router: function() { return this.$1 }, sendCommand: function(e) { return function(bi, bj) { this.$1.sendCommand(e).call(this.$1, this.$0, bi, bj) } }, dispose: function() { this.$1.unregisterHandler(this.$0) } }); var D = global.tab.ApiNullOption = ss.mkEnum(a, 'tab.ApiNullOption', { nullValues: 'nullValues', nonNullValues: 'nonNullValues', allValues: 'allValues' }, true); var E = global.tab.ApiParameterAllowableValuesType = ss.mkEnum(a, 'tab.ApiParameterAllowableValuesType', { all: 'all', list: 'list', range: 'range' }, true); var F = global.tab.ApiParameterDataType = ss.mkEnum(a, 'tab.ApiParameterDataType', { float: 'float', integer: 'integer', string: 'string', boolean: 'boolean', date: 'date', datetime: 'datetime' }, true); var G = global.tab.ApiPeriodType = ss.mkEnum(a, 'tab.ApiPeriodType', { year: 'year', quarter: 'quarter', month: 'month', week: 'week', day: 'day', hour: 'hour', minute: 'minute', second: 'second' }, true); var H = global.tab.ApiSelectionUpdateType = ss.mkEnum(a, 'tab.ApiSelectionUpdateType', { replace: 'replace', add: 'add', remove: 'remove' }, true); var I = global.tab.ApiSheetSizeBehavior = ss.mkEnum(a, 'tab.ApiSheetSizeBehavior', { automatic: 'automatic', exactly: 'exactly', range: 'range', atleast: 'atleast', atmost: 'atmost' }, true); var J = global.tab.ApiSheetType = ss.mkEnum(a, 'tab.ApiSheetType', { worksheet: 'worksheet', dashboard: 'dashboard', story: 'story' }, true); var K = global.tab.ApiTableauEventName = ss.mkEnum(a, 'tab.ApiTableauEventName', { customviewload: 'customviewload', customviewremove: 'customviewremove', customviewsave: 'customviewsave', customviewsetdefault: 'customviewsetdefault', filterchange: 'filterchange', firstinteractive: 'firstinteractive', firstvizsizeknown: 'firstvizsizeknown', marksselection: 'marksselection', markshighlight: 'markshighlight', parametervaluechange: 'parametervaluechange', storypointswitch: 'storypointswitch', tabswitch: 'tabswitch', toolbarstatechange: 'toolbarstatechange', urlaction: 'urlaction', vizresize: 'vizresize' }, true); var L = global.tab.ApiToolbarButtonName = ss.mkEnum(a, 'tab.ApiToolbarButtonName', { redo: 'redo', undo: 'undo' }, true); var M = global.tab.ApiToolbarPosition = ss.mkEnum(a, 'tab.ApiToolbarPosition', { top: 'top', bottom: 'bottom' }, true); var N = global.tab.CommandReturnHandler$1 = ss.mkType(a, 'tab.CommandReturnHandler$1', function(e) { var bi = ss.registerGenericClassInstance(N, [e], function(bj, bk, bl, bm) { this.$0 = null;
                this.$3 = 0;
                this.$2 = null;
                this.$1 = null;
                this.$0 = bj;
                this.$2 = bl;
                this.$3 = bk;
                this.$1 = bm }, { get_commandName: function() { return this.$0 }, get_successCallback: function() { return this.$2 }, get_successCallbackTiming: function() { return this.$3 }, get_errorCallback: function() { return this.$1 } }); return bi });
        ss.initGenericClass(N, 1); var O = global.tab.CrossDomainMessager = ss.mkType(a, 'tab.CrossDomainMessager', function(e) { this.$8 = 0;
            this.$6 = {};
            this.$4 = {};
            this.$5 = {};
            this.$7 = null;
            this.$7 = e; if (p.hasWindowAddEventListener()) { window.addEventListener('message', ss.mkdel(this, this.$1), false) } else if (p.hasDocumentAttachEvent()) { var bi = ss.mkdel(this, this.$1);
                document.attachEvent('onmessage', bi);
                window.attachEvent('onmessage', bi) } else { window.onmessage = ss.mkdel(this, this.$1) }
            this.$8 = 0 }, { registerHandler: function(e) { var bi = 'host' + this.$8; if (ss.isValue(e.get_hostId()) || ss.isValue(this.$6[e.get_hostId()])) { throw o.createInternalError("Host '" + e.get_hostId() + "' is already registered.") }
                this.$8++;
                e.set_hostId(bi);
                this.$6[bi] = e;
                e.add_stateReadyForQuery(ss.mkdel(this, this.$3)) }, unregisterHandler: function(e) { if (ss.isValue(e.get_hostId()) || ss.isValue(this.$6[e.get_hostId()])) { delete this.$6[e.get_hostId()];
                    e.remove_stateReadyForQuery(ss.mkdel(this, this.$3)) } }, sendCommand: function(e) { return function(bi, bj, bk) { var bl = bi.get_iframe(); var bm = bi.get_hostId(); if (!p.hasWindowPostMessage() || ss.isNullOrUndefined(bl) || ss.isNullOrUndefined(bl.contentWindow)) { return } var bn = b.generateNextCommandId(); var bo = this.$4[bm]; if (ss.isNullOrUndefined(bo)) { bo = {};
                        this.$4[bm] = bo }
                    bo[bn] = bk; var bp = bk.get_commandName(); var bq = null; if (ss.isValue(bj)) { bq = JSON.stringify(bj) } var br = new b(bp, bn, bm, bq); var bs = br.serialize(); if (p.isPostMessageSynchronous()) { window.setTimeout(function() { bl.contentWindow.postMessage(bs, '*') }, 0) } else { bl.contentWindow.postMessage(bs, '*') } } }, $3: function(e) { var bi = this.$5[e.get_hostId()]; if (p.isNullOrEmpty(bi)) { return } while (bi.length > 0) { var bj = bi.pop(); if (ss.isValue(bj)) { bj() } } }, $1: function(e) { var bi = e; if (ss.isNullOrUndefined(bi.data)) { return } var bj = b.parse(bi.data.toString()); var bk = bj.get_hostId(); var bl = this.$6[bk]; if (ss.isNullOrUndefined(bl) || !ss.referenceEquals(bl.get_hostId(), bj.get_hostId())) { bl = this.$0(bi) } if (bj.get_isApiCommandName()) { if (bj.get_commandId() === 'xdomainSourceId') { bl.handleEventNotification(bj.get_name(), bj.get_parameters()); if (bj.get_name() === 'api.FirstVizSizeKnownEvent') { var bm = new W('tableau.bootstrap', []);
                            bi.source.postMessage(bm.serialize(), '*') } } else { this.$2(bj) } } else if (!ss.isNullOrUndefined(this.$7)) { var bn = W.parse(bi.data.toString());
                    this.$7(bn, bl) } }, $2: function(e) { var bi = this.$4[e.get_hostId()]; var bj = (ss.isValue(bi) ? bi[e.get_commandId()] : null); if (ss.isNullOrUndefined(bj)) { return }
                delete bi[e.get_commandId()]; if (e.get_name() !== bj.get_commandName()) { return } var bk = new f(e.get_parameters()); var bl = bk.get_data(); if (bk.get_result() === 'api.success') { switch (bj.get_successCallbackTiming()) {
                        case 0:
                            { if (ss.isValue(bj.get_successCallback())) { bj.get_successCallback()(bl) } break }
                        case 1:
                            { var bm = function() { if (ss.isValue(bj.get_successCallback())) { bj.get_successCallback()(bl) } }; var bn = this.$5[e.get_hostId()]; if (ss.isNullOrUndefined(bn)) { bn = [];
                                    this.$5[e.get_hostId()] = bn }
                                bn.push(bm); break }
                        default:
                            { throw o.createInternalError('Unknown timing value: ' + bj.get_successCallbackTiming()) } } } else if (ss.isValue(bj.get_errorCallback())) { var bo = bk.get_result() === 'api.remotefailed'; var bp = (ss.isValue(bl) ? bl.toString() : '');
                    bj.get_errorCallback()(bo, bp) } }, $0: function(e) { var bi = new ss.ObjectEnumerator(this.$6); try { while (bi.moveNext()) { var bj = bi.current(); if (this.$6.hasOwnProperty(bj.key) && ss.referenceEquals(bj.value.get_iframe().contentWindow, e.source)) { return bj.value } } } finally { bi.dispose() } return new q } }); var P = global.tab.DataType = ss.mkEnum(a, 'tab.DataType', { float: 'float', integer: 'integer', string: 'string', boolean: 'boolean', date: 'date', datetime: 'datetime' }, true); var Q = global.tab.DataValue = ss.mkType(a, 'tab.DataValue', null, null, { $ctor: function(e, bi, bj) { var bk = new Object;
                bk.value = null;
                bk.formattedValue = null;
                bk.value = e; if (p.isNullOrEmpty(bj)) { bk.formattedValue = bi } else { bk.formattedValue = bj } return bk }, isInstanceOfType: function() { return true } }); var R = global.tab.FilterCommandsBuilder = ss.mkType(a, 'tab.FilterCommandsBuilder', function() {}, { buildApplyFiltersCommandParams: function(e, bi, bj, bk) { if (p.isNullOrEmpty(e)) { throw o.createNullOrEmptyParameter('fieldName') }
                bj = Y.normalizeEnum(A).call(null, bj, 'updateType'); var bl = []; if (k.isArray(bi)) { for (var bm = 0; bm < bi.length; bm++) { bl.push(bi[bm].toString()) } } else if (ss.isValue(bi)) { bl.push(bi.toString()) } var bn = {};
                bn['api.fieldCaption'] = e;
                bn['api.filterUpdateType'] = bj;
                bn['api.exclude'] = ((ss.isValue(bk) && bk.isExcludeMode) ? true : false); if (bj !== 'all') { bn['api.filterCategoricalValues'] = bl } return bn }, buildRangeFilterCommandParams: function(e, bi) { if (p.isNullOrEmpty(e)) { throw o.createNullOrEmptyParameter('fieldName') } if (ss.isNullOrUndefined(bi)) { throw o.createNullOrEmptyParameter('filterOptions') } var bj = {};
                bj['api.fieldCaption'] = e; if (ss.isValue(bi.min)) { if (p.isDate(bi.min)) { var bk = bi.min; if (p.isDateValid(bk)) { bj['api.filterRangeMin'] = p.serializeDateForServer(bk) } else { throw o.createInvalidDateParameter('filterOptions.min') } } else { bj['api.filterRangeMin'] = bi.min } } if (ss.isValue(bi.max)) { if (p.isDate(bi.max)) { var bl = bi.max; if (p.isDateValid(bl)) { bj['api.filterRangeMax'] = p.serializeDateForServer(bl) } else { throw o.createInvalidDateParameter('filterOptions.max') } } else { bj['api.filterRangeMax'] = bi.max } } if (ss.isValue(bi.nullOption)) { bj['api.filterRangeNullOption'] = bi.nullOption } return bj }, buildRelativeDateFilterCommandParams: function(e, bi) { if (p.isNullOrEmpty(e)) { throw o.createInvalidParameter('fieldName') } else if (ss.isNullOrUndefined(bi)) { throw o.createInvalidParameter('filterOptions') } var bj = {};
                bj['api.fieldCaption'] = e; if (ss.isValue(bi)) { bj['api.filterPeriodType'] = bi.periodType;
                    bj['api.filterDateRangeType'] = bi.rangeType; if (bi.rangeType === 'lastn' || bi.rangeType === 'nextn') { if (ss.isNullOrUndefined(bi.rangeN)) { throw o.create('missingRangeNForRelativeDateFilters', 'Missing rangeN field for a relative date filter of LASTN or NEXTN.') }
                        bj['api.filterDateRange'] = bi.rangeN } if (ss.isValue(bi.anchorDate)) { bj['api.filterDateArchorValue'] = p.serializeDateForServer(bi.anchorDate) } } return bj }, buildHierarchicalFilterCommandParams: function(e, bi, bj, bk) { if (p.isNullOrEmpty(e)) { throw o.createNullOrEmptyParameter('fieldName') }
                bj = Y.normalizeEnum(A).call(null, bj, 'updateType'); var bl = null; var bm = null; if (k.isArray(bi)) { bl = []; var bn = bi; for (var bo = 0; bo < bn.length; bo++) { bl.push(bn[bo].toString()) } } else if (p.isString(bi)) { bl = [];
                    bl.push(bi.toString()) } else if (ss.isValue(bi) && ss.isValue(bi['levels'])) { var bp = bi['levels'];
                    bm = []; if (k.isArray(bp)) { var bq = bp; for (var br = 0; br < bq.length; br++) { bm.push(bq[br].toString()) } } else { bm.push(bp.toString()) } } else if (ss.isValue(bi)) { throw o.createInvalidParameter('values') } var bs = {};
                bs['api.fieldCaption'] = e;
                bs['api.filterUpdateType'] = bj;
                bs['api.exclude'] = ((ss.isValue(bk) && bk.isExcludeMode) ? true : false); if (ss.isValue(bl)) { bs['api.filterHierarchicalValues'] = JSON.stringify(bl) } if (ss.isValue(bm)) { bs['api.filterHierarchicalLevels'] = JSON.stringify(bm) } return bs }, buildClearFilterCommandsParam: function(e) { if (p.isNullOrEmpty(e)) { throw o.createNullOrEmptyParameter('fieldName') } var bi = {};
                bi['api.fieldCaption'] = e; return bi }, filterCommandError: function(e) { var bi = e; if (ss.isValue(bi) && ss.isValue(bi.errorCode)) { var bj = (ss.isValue(bi.additionalInformation) ? bi.additionalInformation.toString() : ''); switch (bi.errorCode) {
                        case 'invalidFilterFieldName':
                            { return o.create('invalidFilterFieldName', bj) }
                        case 'invalidFilterFieldValue':
                            { return o.create('invalidFilterFieldValue', bj) }
                        case 'invalidAggregationFieldName':
                            { return o.createInvalidAggregationFieldName(bj) }
                        default:
                            { return o.createServerError(bj) } } } return null }, normalizeRangeFilterOption: function(e) { if (ss.isNullOrUndefined(e)) { throw o.createNullOrEmptyParameter('filterOptions') } if (ss.isNullOrUndefined(e.min) && ss.isNullOrUndefined(e.max) && ss.isNullOrUndefined(e.nullOption)) { throw o.create('invalidParameter', 'At least one of filterOptions.min or filterOptions.max or filterOptions.nullOption must be specified.') } var bi = new Object; if (ss.isValue(e.min)) { bi.min = e.min } if (ss.isValue(e.max)) { bi.max = e.max } if (ss.isValue(e.nullOption)) { bi.nullOption = Y.normalizeEnum(D).call(null, e.nullOption, 'filterOptions.nullOption') } return bi }, normalizeRelativeDateFilterOptions: function(e) { if (ss.isNullOrUndefined(e)) { throw o.createNullOrEmptyParameter('filterOptions') } var bi = new Object;
                bi.rangeType = Y.normalizeEnum(t).call(null, e.rangeType, 'filterOptions.rangeType');
                bi.periodType = Y.normalizeEnum(G).call(null, e.periodType, 'filterOptions.periodType'); if (bi.rangeType === 'lastn' || bi.rangeType === 'nextn') { if (ss.isNullOrUndefined(e.rangeN)) { throw o.create('missingRangeNForRelativeDateFilters', 'Missing rangeN field for a relative date filter of LASTN or NEXTN.') }
                    bi.rangeN = p.toInt(e.rangeN) } if (ss.isValue(e.anchorDate)) { if (!p.isDate(e.anchorDate) || !p.isDateValid(e.anchorDate)) { throw o.createInvalidDateParameter('filterOptions.anchorDate') }
                    bi.anchorDate = e.anchorDate } return bi }, createFilterCommandReturnHandler: function(e, bi, bj) { return new(ss.makeGenericType(N, [Object]))(e, 0, ss.mkdel(this, function(bk) { var bl = this.filterCommandError(bk); if (ss.isNullOrUndefined(bl)) { bj.resolve(bi) } else { bj.reject(bl) } }), function(bk, bl) { if (bk) { bj.reject(o.createInvalidFilterFieldNameOrValue(bi)) } else { var bm = o.create('filterCannotBePerformed', bl);
                        bj.reject(bm) } }) } }); var S = global.tab.GetDataCommandsBuilder = ss.mkType(a, 'tab.GetDataCommandsBuilder', function() {}, { getSummaryDataCommandParams: function(e) { var bi = {};
                e = e || new Object;
                bi['api.ignoreAliases'] = ss.coalesce(e.ignoreAliases, false);
                bi['api.ignoreSelection'] = ss.coalesce(e.ignoreSelection, false);
                bi['api.maxRows'] = ss.coalesce(e.maxRows, 0); return bi }, getUnderlyingDataCommandParams: function(e) { var bi = {};
                e = e || new Object;
                bi['api.ignoreAliases'] = ss.coalesce(e.ignoreAliases, false);
                bi['api.ignoreSelection'] = ss.coalesce(e.ignoreSelection, false);
                bi['api.includeAllColumns'] = ss.coalesce(e.includeAllColumns, false);
                bi['api.maxRows'] = ss.coalesce(e.maxRows, 0); return bi }, getUnderlyingTablesCommandParams: function() { return {} }, getUnderlyingTableDataCommandParams: function(e, bi) { var bj = {};
                bi = bi || new Object;
                bj['api.ignoreAliases'] = ss.coalesce(bi.ignoreAliases, false);
                bj['api.ignoreSelection'] = ss.coalesce(bi.ignoreSelection, false);
                bj['api.includeAllColumns'] = ss.coalesce(bi.includeAllColumns, false);
                bj['api.maxRows'] = ss.coalesce(bi.maxRows, 0);
                bj['api.tableId'] = ss.coalesce(e, ''); return bj }, getSummaryDataResponseHandler: function(e) { return new(ss.makeGenericType(N, [Object]))('api.GetSummaryTableCommand', 0, ss.mkdel(this, function(bi) { var bj = bi; var bk = this.processGetDataPresModel(bj);
                    e.resolve(bk) }), function(bi, bj) { e.reject(o.createServerError(bj)) }) }, getUnderlyingDataResponseHandler: function(e) { return new(ss.makeGenericType(N, [Object]))('api.GetUnderlyingTableCommand', 0, ss.mkdel(this, function(bi) { var bj = bi; var bk = this.processGetDataPresModel(bj);
                    e.resolve(bk) }), function(bi, bj) { e.reject(o.createServerError(bj)) }) }, processGetDataPresModel: function(e) { var bi = this.$3(e.dataTable); var bj = this.$2(e.headers); var bk = new i(bi, e.isSummary, bi.length, bj); return new be(bk) }, $3: function(e) { var bi = []; for (var bj = 0; bj < e.length; bj++) { var bk = e[bj]; var bl = []; for (var bm = 0; bm < bk.length; bm++) { var bn = bk[bm];
                        bl.push(p.getDataValue(bn)) }
                    bi.push(bl) } return bi }, $2: function(e) { var bi = []; for (var bj = 0; bj < e.length; bj++) { var bk = e[bj]; var bl = new h(bk.fieldName, v.convertDataType(bk.dataType), bk.isReferenced, bk.index);
                    bi.push(new bd(bl)) } return bi }, $0: function(e, bi) { var bj = bi; if (!e) { var bk = new ss.StringBuilder(bi);
                    bk.append('\nPossible reasons:');
                    bk.append('\nCalling newer version of API against an older version of Tableau Server');
                    bj = bk.toString() }
                console.error(bj); return bj }, getUnderlyingTablesResponseHandler: function(e) { return new(ss.makeGenericType(N, [Object]))('api.GetUnderlyingTablesCommand', 0, ss.mkdel(this, function(bi) { var bj = bi; var bk = this.$1(bj);
                    e.resolve(bk._toApiCollection()) }), ss.mkdel(this, function(bi, bj) { e.reject(o.createServerError(this.$0(bi, bj))) })) }, $1: function(e) { var bi = new tab._Collection; for (var bj = 0; bj < e.logicalTables.length; bj++) { var bk = e.logicalTables[bj];
                    bi._add(bk.tableId, new bf(bk.tableId, bk.caption)) } return bi }, getUnderlyingTableDataResponseHandler: function(e) { return new(ss.makeGenericType(N, [Object]))('api.GetUnderlyingTableDataCommand', 0, ss.mkdel(this, function(bi) { var bj = bi; var bk = this.processGetDataPresModel(bj);
                    e.resolve(bk) }), ss.mkdel(this, function(bi, bj) { e.reject(o.createServerError(this.$0(bi, bj))) })) } }); var T = global.tab.HostedApiMessageHandler = ss.mkType(a, 'tab.HostedApiMessageHandler', function() { this.$2$1 = null;
            B.call(this) }, { add_stateReadyForQuery: function(e) { this.$2$1 = ss.delegateCombine(this.$2$1, e) }, remove_stateReadyForQuery: function(e) { this.$2$1 = ss.delegateRemove(this.$2$1, e) }, get_hostId: function() { return null }, set_hostId: function(e) {}, get_iframe: function() { return null } }); var U = global.tab.HostedApiMessageRouter = ss.mkType(a, 'tab.HostedApiMessageRouter', function() { this.$0 = null;
            this.$0 = new O(null) }, { registerHandler: function(e) { this.$0.registerHandler(e) }, unregisterHandler: function(e) { this.$0.unregisterHandler(e) }, sendCommand: function(e) { return function(bi, bj, bk) { this.$0.sendCommand(e).call(this.$0, bi, bj, bk) } } }); var V = global.tab.MarkImpl = ss.mkType(a, 'tab.MarkImpl', function(e) { this.$2 = null;
            this.$3 = new tab._Collection;
            this.$4 = 0; if (k.isArray(e)) { var bi = e; for (var bj = 0; bj < bi.length; bj++) { var bk = bi[bj]; if (!ss.isValue(bk.fieldName)) { throw o.createInvalidParameter('pair.fieldName') } if (!ss.isValue(bk.value)) { throw o.createInvalidParameter('pair.value') } var bl = new bh(bk.fieldName, bk.value);
                    this.$3._add(bl.fieldName, bl) } } else { this.$4 = e } }, { get_pairs: function() { return this.$3 }, get_tupleId: function() { return this.$4 }, $1: function() { if (ss.isNullOrUndefined(this.$2)) { this.$2 = this.$3._toApiCollection() } return this.$2 }, $0: function(e) { this.$3._add(e.fieldName, e) } }, { processActiveMarks: function(e) { var bi = new tab._Collection; if (ss.isNullOrUndefined(e) || p.isNullOrEmpty(e.marks)) { return bi } for (var bj = 0; bj < e.marks.length; bj++) { var bk = e.marks[bj]; var bl = bk.tupleId; var bm = new bg(bl);
                    bi._add(bl.toString(), bm); for (var bn = 0; bn < bk.pairs.length; bn++) { var bo = bk.pairs[bn]; var bp = p.convertRawValue(bo.value, bo.valueDataType); var bq = new bh(bo.fieldName, bp);
                        bq.formattedValue = bo.formattedValue; if (!bm.impl.get_pairs()._has(bq.fieldName)) { bm.impl.$0(bq) } } } return bi } }); var W = global.tab.NonApiCommand = ss.mkType(a, 'tab.NonApiCommand', function(e, bi) { this.$0 = null;
            this.$1$1 = null;
            this.set_name(e);
            this.$0 = bi }, { get_name: function() { return this.$1$1 }, set_name: function(e) { this.$1$1 = e }, get_parameters: function() { return this.$0 }, serialize: function() { var e = [];
                e.push(this.get_name().toString());
                e = e.concat.apply(e, this.$0); return e.join(',') } }, { parse: function(e) { var bi = e.split(String.fromCharCode(44)); var bj = bi[0]; var bk = bi.slice(1); return new W(bj, bk) } }); var X = global.tab.Point = ss.mkType(a, 'tab.Point', null, null, { $ctor: function(e, bi) { var bj = new Object;
                bj.x = 0;
                bj.y = 0;
                bj.x = e;
                bj.y = bi; return bj }, isInstanceOfType: function() { return true } }); var Y = global.tab.PublicEnums = ss.mkType(a, 'tab.PublicEnums', null, null, { tryNormalizeEnum: function(e) { return function(bi, bj) { if (ss.isValue(bi)) { var bk = bi.toString().toUpperCase(); var bl = ss.Enum.getValues(e); for (var bm = 0; bm < bl.length; bm++) { var bn = bl[bm]; var bo = bn.toUpperCase(); if (ss.referenceEquals(bk, bo)) { bj.$ = bn; return true } } }
                    bj.$ = ss.getDefaultValue(e); return false } }, normalizeEnum: function(e) { return function(bi, bj) { var bk = {}; if (!Y.tryNormalizeEnum(e).call(null, bi, bk)) { throw o.createInvalidParameter(bj) } return bk.$ } }, isValidEnum: function(e) { return function(bi) { var bj = {}; var bk = Y.tryNormalizeEnum(e).call(null, bi, bj); return bk } } }); var Z = global.tab.SharedUtils = ss.mkType(a, 'tab.SharedUtils', function() {}, { addVisualIdForWorksheet: function(e, bi, bj) { e['api.worksheetName'] = bi; if (ss.isValue(bj)) { e['api.dashboardName'] = bj } } }); var ba = global.tab.SheetSize = ss.mkType(a, 'tab.SheetSize', null, null, { $ctor: function(e, bi, bj) { var bk = new Object;
                bk.behavior = null;
                bk.minSize = null;
                bk.maxSize = null;
                bk.behavior = ss.coalesce(e, 'automatic'); if (ss.isValue(bi)) { bk.minSize = bi } else { delete bk['minSize'] } if (ss.isValue(bj)) { bk.maxSize = bj } else { delete bk['maxSize'] } return bk }, isInstanceOfType: function() { return true } }); var bb = global.tab.SheetSizeFactory = ss.mkType(a, 'tab.SheetSizeFactory', null, null, { createAutomatic: function() { var e = ba.$ctor('automatic', null, null); return e }, fromSizeConstraints: function(e) { var bi = e.minHeight; var bj = e.minWidth; var bk = e.maxHeight; var bl = e.maxWidth; var bm = 'automatic'; var bn = null; var bo = null; if (bi === 0 && bj === 0) { if (bk === 0 && bl === 0) {} else { bm = 'atmost';
                        bo = bc.$ctor(bl, bk) } } else if (bk === 0 && bl === 0) { bm = 'atleast';
                    bn = bc.$ctor(bj, bi) } else if (bk === bi && bl === bj && bj > 0) { bm = 'exactly';
                    bn = bc.$ctor(bj, bi);
                    bo = bc.$ctor(bj, bi) } else { bm = 'range'; if (bj === 0 && bl === 0) { bl = 2147483647 }
                    bn = bc.$ctor(bj, bi);
                    bo = bc.$ctor(bl, bk) } return ba.$ctor(bm, bn, bo) } }); var bc = global.tab.Size = ss.mkType(a, 'tab.Size', null, null, { $ctor: function(e, bi) { var bj = new Object;
                bj.width = 0;
                bj.height = 0;
                bj.width = e;
                bj.height = bi; return bj }, isInstanceOfType: function() { return true } }); var bd = global.tableauSoftware.Column = ss.mkType(a, 'tableauSoftware.Column', function(e) { this.$0 = null;
            this.$0 = e }, { getFieldName: function() { return this.$0.get_fieldName() }, getDataType: function() { return this.$0.get_dataType() }, getIsReferenced: function() { return this.$0.get_isReferenced() }, getIndex: function() { return this.$0.get_index() } }); var be = global.tableauSoftware.DataTable = ss.mkType(a, 'tableauSoftware.DataTable', function(e) { this.$0 = null;
            this.$0 = e }, { getName: function() { return this.$0.get_name() }, getData: function() { return this.$0.get_rows() }, getColumns: function() { return this.$0.get_columns() }, getTotalRowCount: function() { return this.$0.get_totalRowCount() }, getIsSummaryData: function() { return this.$0.get_isSummaryData() } }); var bf = global.tableauSoftware.LogicalTable = ss.mkType(a, 'tableauSoftware.LogicalTable', function(e, bi) { this.$1 = null;
            this.$0 = null;
            this.$1 = e;
            this.$0 = bi }, { getTableId: function() { return this.$1 }, getCaption: function() { return this.$0 } }); var bg = global.tableauSoftware.Mark = ss.mkType(a, 'tableauSoftware.Mark', function(e) { this.impl = null;
            this.impl = new V(e) }, { getPairs: function() { return this.impl.$1() } }); var bh = global.tableauSoftware.Pair = ss.mkType(a, 'tableauSoftware.Pair', function(e, bi) { this.fieldName = null;
            this.value = null;
            this.formattedValue = null;
            this.fieldName = e;
            this.value = bi;
            this.formattedValue = (ss.isValue(bi) ? bi.toString() : '') });
        ss.initClass(b);
        ss.initClass(c);
        ss.initClass(d);
        ss.initClass(f);
        ss.initClass(g);
        ss.initClass(h);
        ss.initClass(i);
        ss.initClass(j);
        ss.initClass(k);
        ss.initClass(l);
        ss.initClass(m);
        ss.initClass(n);
        ss.initClass(o);
        ss.initClass(p);
        ss.initClass(q);
        ss.initClass(r);
        ss.initClass(v);
        ss.initClass(B);
        ss.initClass(C);
        ss.initClass(O);
        ss.initClass(Q, Object);
        ss.initClass(R);
        ss.initClass(S);
        ss.initClass(T, B);
        ss.initClass(U);
        ss.initClass(V);
        ss.initClass(W);
        ss.initClass(X, Object);
        ss.initClass(Y);
        ss.initClass(Z);
        ss.initClass(ba, Object);
        ss.initClass(bb);
        ss.initClass(bc, Object);
        ss.initClass(bd);
        ss.initClass(be);
        ss.initClass(bf);
        ss.initClass(bg);
        ss.initClass(bh);
        (function() { b.crossDomainEventNotificationId = 'xdomainSourceId';
            b.$0 = 0 })();
        (function() { var e = window['_ApiObjectRegistryGlobalState']; var bi = e; if (ss.isNullOrUndefined(bi)) { bi = new Object }
            window['_ApiObjectRegistryGlobalState'] = bi;
            window._ApiObjectRegistryGlobalState.creationRegistry = window._ApiObjectRegistryGlobalState.creationRegistry || {};
            window._ApiObjectRegistryGlobalState.singletonInstanceRegistry = window._ApiObjectRegistryGlobalState.singletonInstanceRegistry || {} })();
        (function() { k.$1 = 'array';
            k.$2 = 'boolean';
            k.$3 = 'date';
            k.$4 = 'function';
            k.$5 = 'number';
            k.$6 = 'object';
            k.$7 = 'regexp';
            k.$8 = 'string';
            k.$9 = ss.mkdict(['[object Boolean]', 'boolean', '[object Number]', 'number', '[object String]', 'string', '[object Function]', 'function', '[object Array]', 'array', '[object Date]', 'date', '[object RegExp]', 'regexp', '[object Object]', 'object']);
            k.$f = String.prototype['trim'];
            k.$e = Object.prototype['toString'];
            k.$g = new RegExp('^[\\s\\xA0]+');
            k.$h = new RegExp('[\\s\\xA0]+$');
            k.$b = new RegExp('^[\\],:{}\\s]*$');
            k.$c = new RegExp('\\\\(?:["\\\\\\/bfnrt]|u[0-9a-fA-F]{4})', 'g');
            k.$d = new RegExp('"[^"\\\\\\n\\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?', 'g');
            k.$a = new RegExp('(?:^|:|,)(?:\\s*\\[)+', 'g') })();
        (function() { var e = global.tableauSoftware;
            e.DeviceType = { DEFAULT: 'default', DESKTOP: 'desktop', TABLET: 'tablet', PHONE: 'phone' };
            e.DashboardObjectType = { BLANK: 'blank', WORKSHEET: 'worksheet', QUICK_FILTER: 'quickFilter', PARAMETER_CONTROL: 'parameterControl', PAGE_FILTER: 'pageFilter', LEGEND: 'legend', TITLE: 'title', TEXT: 'text', IMAGE: 'image', WEB_PAGE: 'webPage', ADDIN: 'addIn' };
            e.DataType = { FLOAT: 'float', INTEGER: 'integer', STRING: 'string', BOOLEAN: 'boolean', DATE: 'date', DATETIME: 'datetime' };
            e.DateRangeType = { LAST: 'last', LASTN: 'lastn', NEXT: 'next', NEXTN: 'nextn', CURR: 'curr', TODATE: 'todate' };
            e.ErrorCode = { INTERNAL_ERROR: 'internalError', SERVER_ERROR: 'serverError', INVALID_AGGREGATION_FIELD_NAME: 'invalidAggregationFieldName', INVALID_TOOLBAR_BUTTON_NAME: 'invalidToolbarButtonName', INVALID_PARAMETER: 'invalidParameter', INVALID_URL: 'invalidUrl', STALE_DATA_REFERENCE: 'staleDataReference', VIZ_ALREADY_IN_MANAGER: 'vizAlreadyInManager', NO_URL_OR_PARENT_ELEMENT_NOT_FOUND: 'noUrlOrParentElementNotFound', INVALID_FILTER_FIELDNAME: 'invalidFilterFieldName', INVALID_FILTER_FIELDVALUE: 'invalidFilterFieldValue', INVALID_FILTER_FIELDNAME_OR_VALUE: 'invalidFilterFieldNameOrValue', FILTER_CANNOT_BE_PERFORMED: 'filterCannotBePerformed', NOT_ACTIVE_SHEET: 'notActiveSheet', INVALID_CUSTOM_VIEW_NAME: 'invalidCustomViewName', MISSING_RANGEN_FOR_RELATIVE_DATE_FILTERS: 'missingRangeNForRelativeDateFilters', MISSING_MAX_SIZE: 'missingMaxSize', MISSING_MIN_SIZE: 'missingMinSize', MISSING_MINMAX_SIZE: 'missingMinMaxSize', INVALID_SIZE: 'invalidSize', INVALID_SIZE_BEHAVIOR_ON_WORKSHEET: 'invalidSizeBehaviorOnWorksheet', SHEET_NOT_IN_WORKBOOK: 'sheetNotInWorkbook', INDEX_OUT_OF_RANGE: 'indexOutOfRange', DOWNLOAD_WORKBOOK_NOT_ALLOWED: 'downloadWorkbookNotAllowed', NULL_OR_EMPTY_PARAMETER: 'nullOrEmptyParameter', BROWSER_NOT_CAPABLE: 'browserNotCapable', UNSUPPORTED_EVENT_NAME: 'unsupportedEventName', INVALID_DATE_PARAMETER: 'invalidDateParameter', INVALID_SELECTION_FIELDNAME: 'invalidSelectionFieldName', INVALID_SELECTION_VALUE: 'invalidSelectionValue', INVALID_SELECTION_DATE: 'invalidSelectionDate', NO_URL_FOR_HIDDEN_WORKSHEET: 'noUrlForHiddenWorksheet', MAX_VIZ_RESIZE_ATTEMPTS: 'maxVizResizeAttempts' };
            e.FieldAggregationType = { SUM: 'SUM', AVG: 'AVG', MIN: 'MIN', MAX: 'MAX', STDEV: 'STDEV', STDEVP: 'STDEVP', VAR: 'VAR', VARP: 'VARP', COUNT: 'COUNT', COUNTD: 'COUNTD', MEDIAN: 'MEDIAN', ATTR: 'ATTR', NONE: 'NONE', PERCENTILE: 'PERCENTILE', YEAR: 'YEAR', QTR: 'QTR', MONTH: 'MONTH', DAY: 'DAY', HOUR: 'HOUR', MINUTE: 'MINUTE', SECOND: 'SECOND', WEEK: 'WEEK', WEEKDAY: 'WEEKDAY', MONTHYEAR: 'MONTHYEAR', MDY: 'MDY', END: 'END', TRUNC_YEAR: 'TRUNC_YEAR', TRUNC_QTR: 'TRUNC_QTR', TRUNC_MONTH: 'TRUNC_MONTH', TRUNC_WEEK: 'TRUNC_WEEK', TRUNC_DAY: 'TRUNC_DAY', TRUNC_HOUR: 'TRUNC_HOUR', TRUNC_MINUTE: 'TRUNC_MINUTE', TRUNC_SECOND: 'TRUNC_SECOND', QUART1: 'QUART1', QUART3: 'QUART3', SKEWNESS: 'SKEWNESS', KURTOSIS: 'KURTOSIS', INOUT: 'INOUT', SUM_XSQR: 'SUM_XSQR', USER: 'USER', COLLECT: 'COLLECT' };
            e.FieldRoleType = { DIMENSION: 'dimension', MEASURE: 'measure', UNKNOWN: 'unknown' };
            e.FilterUpdateType = { ALL: 'all', REPLACE: 'replace', ADD: 'add', REMOVE: 'remove' };
            e.FilterType = { CATEGORICAL: 'categorical', QUANTITATIVE: 'quantitative', HIERARCHICAL: 'hierarchical', RELATIVEDATE: 'relativedate' };
            e.NullOption = { NULL_VALUES: 'nullValues', NON_NULL_VALUES: 'nonNullValues', ALL_VALUES: 'allValues' };
            e.ParameterAllowableValuesType = { ALL: 'all', LIST: 'list', RANGE: 'range' };
            e.ParameterDataType = { FLOAT: 'float', INTEGER: 'integer', STRING: 'string', BOOLEAN: 'boolean', DATE: 'date', DATETIME: 'datetime' };
            e.PeriodType = { YEAR: 'year', QUARTER: 'quarter', MONTH: 'month', WEEK: 'week', DAY: 'day', HOUR: 'hour', MINUTE: 'minute', SECOND: 'second' };
            e.SelectionUpdateType = { REPLACE: 'replace', ADD: 'add', REMOVE: 'remove' };
            e.SheetSizeBehavior = { AUTOMATIC: 'automatic', EXACTLY: 'exactly', RANGE: 'range', ATLEAST: 'atleast', ATMOST: 'atmost' };
            e.SheetType = { WORKSHEET: 'worksheet', DASHBOARD: 'dashboard', STORY: 'story' };
            e.TableauEventName = { CUSTOM_VIEW_LOAD: 'customviewload', CUSTOM_VIEW_REMOVE: 'customviewremove', CUSTOM_VIEW_SAVE: 'customviewsave', CUSTOM_VIEW_SET_DEFAULT: 'customviewsetdefault', FILTER_CHANGE: 'filterchange', FIRST_INTERACTIVE: 'firstinteractive', FIRST_VIZ_SIZE_KNOWN: 'firstvizsizeknown', MARKS_SELECTION: 'marksselection', MARKS_HIGHLIGHT: 'markshighlight', PARAMETER_VALUE_CHANGE: 'parametervaluechange', STORY_POINT_SWITCH: 'storypointswitch', TAB_SWITCH: 'tabswitch', TOOLBAR_STATE_CHANGE: 'toolbarstatechange', URL_ACTION: 'urlaction', VIZ_RESIZE: 'vizresize' };
            e.ToolbarPosition = { TOP: 'top', BOTTOM: 'bottom' };
            e.ToolbarButtonName = { REDO: 'redo', UNDO: 'undo' } })() })();
    /*! API */
    (function() { 'use strict'; var a = {};
        global.tab = global.tab || {};
        global.tableauSoftware = global.tableauSoftware || {};
        ss.initAssembly(a, 'Tableau.JavaScript.Vql.Api'); var b = global.tab._ApiBootstrap = ss.mkType(a, 'tab._ApiBootstrap', null, null, { initialize: function() { tab._ApiObjectRegistry.registerApiMessageRouter(function() { return new D }) } }); var c = ss.mkType(a, 'tab._CustomViewImpl', function(e, bn, bo) { this.$b = null;
            this.$i = null;
            this.$k = null;
            this.$f = null;
            this.$g = null;
            this.$h = null;
            this.$j = null;
            this.$d = false;
            this.$c = false;
            this.$e = false;
            this.$k = e;
            this.$g = bn;
            this.$f = bo;
            this.$d = false;
            this.$c = false;
            this.$e = false }, { $4: function() { if (ss.isNullOrUndefined(this.$b)) { this.$b = new S(this) } return this.$b }, $a: function() { return this.$k.get_workbook() }, $9: function() { return this.$j }, $6: function() { return this.$g }, $7: function(e) { if (this.$e) { throw tab._TableauException.create('staleDataReference', 'Stale data') }
                this.$g = e }, $8: function() { return this.$h }, $2: function() { return this.$d }, $3: function(e) { if (this.$e) { throw tab._TableauException.create('staleDataReference', 'Stale data') }
                this.$d = e }, $5: function() { return this.$c }, $0: function() { if (this.$e || ss.isNullOrUndefined(this.$i)) { throw tab._TableauException.create('staleDataReference', 'Stale data') }
                this.$i.isPublic = this.$d;
                this.$i.name = this.$g; var e = new tab._Deferred; var bn = {};
                bn['api.customViewParam'] = this.$i; var bo = c.$0('api.UpdateCustomViewCommand', e, ss.mkdel(this, function(bp) { c._processCustomViewUpdate(this.$k, this.$f, bp, true);
                    e.resolve(this.$4()) }));
                this.$f.sendCommand(Object).call(this.$f, bn, bo); return e.get_promise() }, $1: function() { var e = new tab._Deferred; var bn = {};
                bn['api.customViewParam'] = this.$i; var bo = c.$0('api.RemoveCustomViewCommand', e, ss.mkdel(this, function(bp) { this.$e = true;
                    c._processCustomViews(this.$k, this.$f, bp);
                    e.resolve(this.$4()) }));
                this.$f.sendCommand(Object).call(this.$f, bn, bo); return e.get_promise() }, _showAsync: function() { if (this.$e || ss.isNullOrUndefined(this.$i)) { throw tab._TableauException.create('staleDataReference', 'Stale data') } return c._showCustomViewAsync(this.$k, this.$f, this.$i) } }, { _getAsync: function(e) { var bn = new tab._Deferred;
                bn.resolve(e.get__customViewImpl().$4()); return bn.get_promise() }, _createNew: function(e, bn, bo, bp) { var bq = new c(e, bo.name, bn);
                bq.$d = bo.isPublic;
                bq.$j = bo.url;
                bq.$h = bo.owner.friendlyName;
                bq.$c = ss.isValue(bp) && ss.unbox(bp) === bo.id;
                bq.$i = bo; return bq }, _saveNewAsync: function(e, bn, bo) { var bp = new tab._Deferred; var bq = {};
                bq['api.customViewName'] = bo; var br = c.$0('api.SaveNewCustomViewCommand', bp, function(bs) { c._processCustomViewUpdate(e, bn, bs, true); var bt = null; if (ss.isValue(e.$k())) { bt = e.$k().get_item(0) }
                    bp.resolve(bt) });
                bn.sendCommand(Object).call(bn, bq, br); return bp.get_promise() }, _showCustomViewAsync: function(e, bn, bo) { var bp = new tab._Deferred; var bq = {}; if (ss.isValue(bo)) { bq['api.customViewParam'] = bo } var br = c.$0('api.ShowCustomViewCommand', bp, function(bs) { var bt = e.get_activeCustomView();
                    bp.resolve(bt) });
                bn.sendCommand(Object).call(bn, bq, br); return bp.get_promise() }, _makeCurrentCustomViewDefaultAsync: function(e, bn) { var bo = new tab._Deferred; var bp = {}; var bq = c.$0('api.MakeCurrentCustomViewDefaultCommand', bo, function(br) { var bs = e.get_activeCustomView();
                    bo.resolve(bs) });
                bn.sendCommand(Object).call(bn, bp, bq); return bo.get_promise() }, _getCustomViewsAsync: function(e, bn) { var bo = new tab._Deferred; var bp = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.FetchCustomViewsCommand', 0, function(bq) { c._processCustomViews(e, bn, bq);
                    bo.resolve(e.$d()._toApiCollection()) }, function(bq, br) { bo.reject(tab._TableauException.create('serverError', br)) });
                bn.sendCommand(Object).call(bn, null, bp); return bo.get_promise() }, _processCustomViews: function(e, bn, bo) { c._processCustomViewUpdate(e, bn, bo, false) }, _processCustomViewUpdate: function(e, bn, bo, bp) { e.$c(null);
                e.$j(e.$d());
                e.$e(new tab._Collection); if (bp) { e.$l(new tab._Collection); if (ss.isValue(bo.newView)) { c.$1(e, bn, bo, bo.newView, bp) } } if (ss.isValue(bo.customViews)) { for (var bq = 0; bq < bo.customViews.length; bq++) { var br = bo.customViews[bq];
                        c.$1(e, bn, bo, br, bp) } } }, $1: function(e, bn, bo, bp, bq) { var br = null; var bs = null; if (ss.isValue(bo.currentView)) { br = bo.currentView.name;
                    bs = bo.currentView.owner.friendlyName } var bt = bo.defaultCustomViewId; var bu = c._createNew(e, bn, bp, bt); var bv = bu.$6(); if (e.$d()._has(bv)) { bv += '/' + bp.owner }
                e.$d()._add(bv, bu.$4()); if (e.$i()._has(bv)) { e.$i()._remove(bv) } else if (bq && !e.$k()._has(bv)) { e.$k()._add(bv, bu.$4()) } if (ss.isValue(br) && ss.referenceEquals(bu.$6(), br) && ss.referenceEquals(bu.$8(), bs)) { e.$c(bu.$4()) } }, $0: function(e, bn, bo) { var bp = function(bq, br) { bn.reject(tab._TableauException.create('serverError', br)) }; return new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(e, 0, bo, bp) } }); var d = global.tab._DashboardImpl = ss.mkType(a, 'tab._DashboardImpl', function(e, bn, bo) { this.$d = null;
            this.$f = new tab._Collection;
            this.$e = new tab._Collection;
            g.call(this, e, bn, bo) }, { get_sheet: function() { return this.get_dashboard() }, get_dashboard: function() { if (ss.isNullOrUndefined(this.$d)) { this.$d = new T(this) } return this.$d }, get_worksheets: function() { return this.$f }, get_objects: function() { return this.$e }, $c: function(e, bn) { this.$e = new tab._Collection;
                this.$f = new tab._Collection; for (var bo = 0; bo < e.length; bo++) { var bp = e[bo]; var bq = null; if (e[bo].objectType === 'worksheet') { var br = bp.name; if (ss.isNullOrUndefined(br)) { continue } var bs = this.$f.get__length(); var bt = tab.SheetSizeFactory.createAutomatic(); var bu = false; var bv = bn(br); var bw = ss.isNullOrUndefined(bv); var bx = (bw ? '' : bv.getUrl()); var by = h.$ctor(br, 'worksheet', bs, bt, this.get_workbook(), bx, bu, bw, bp.zoneId); var bz = new p(by, this.get_workbookImpl(), this.get_messagingOptions(), this);
                        bq = bz.get_worksheet();
                        this.$f._add(br, bz.get_worksheet()) } var bA = new U(bp, this.get_dashboard(), bq);
                    this.$e._add(bo.toString(), bA) } } }); var f = global.tab._DataSourceImpl = ss.mkType(a, 'tab._DataSourceImpl', function(e, bn) { this.$3 = null;
            this.$1 = new tab._Collection;
            this.$2 = false;
            this.$0 = null;
            tab._Param.verifyString(e, 'name');
            this.$3 = e;
            this.$2 = bn }, { get_dataSource: function() { if (ss.isNullOrUndefined(this.$0)) { this.$0 = new V(this) } return this.$0 }, get_name: function() { return this.$3 }, get_fields: function() { return this.$1 }, get_isPrimary: function() { return this.$2 }, addField: function(e) { this.$1._add(e.getName(), e) } }, { processDataSource: function(e) { var bn = new f(e.name, e.isPrimary); var bo = ss.coalesce(e.fields, []); for (var bp = 0; bp < bo.length; bp++) { var bq = bo[bp]; var br = tab.ApiEnumConverter.convertFieldRole(bq.role); var bs = tab.ApiEnumConverter.convertFieldAggregation(bq.aggregation); var bt = new W(bn.get_dataSource(), bq.name, br, bs);
                    bn.addField(bt) } return bn }, processDataSourcesForWorksheet: function(e) { var bn = new tab._Collection; var bo = null; for (var bp = 0; bp < e.dataSources.length; bp++) { var bq = e.dataSources[bp]; var br = f.processDataSource(bq); if (bq.isPrimary) { bo = br } else { bn._add(bq.name, br.get_dataSource()) } } if (ss.isValue(bo)) { bn._addToFirst(bo.get_name(), bo.get_dataSource()) } return bn } }); var g = global.tab._SheetImpl = ss.mkType(a, 'tab._SheetImpl', function(e, bn, bo) { this.$5 = null;
            this.$1 = 0;
            this.$2 = false;
            this.$3 = false;
            this.$7 = null;
            this.$8 = null;
            this.$9 = null;
            this.$a = null;
            this.$4 = null;
            this.$6 = null;
            this.$b = 0;
            tab._Param.verifyValue(e, 'sheetInfoImpl');
            tab._Param.verifyValue(bn, 'workbookImpl');
            tab._Param.verifyValue(bo, 'messagingOptions');
            this.$5 = e.name;
            this.$1 = e.index;
            this.$2 = e.isActive;
            this.$3 = e.isHidden;
            this.$7 = e.sheetType;
            this.$8 = e.size;
            this.$9 = e.url;
            this.$a = bn;
            this.$4 = bo;
            this.$b = e.zoneId }, { get_sheet: null, get_name: function() { return this.$5 }, get_index: function() { return this.$1 }, get_workbookImpl: function() { return this.$a }, get_workbook: function() { return this.$a.get_workbook() }, get_url: function() { if (this.$3) { throw tab._TableauException.createNoUrlForHiddenWorksheet() } return this.$9 }, get_size: function() { return this.$8 }, get_isHidden: function() { return this.$3 }, get_isActive: function() { return this.$2 }, set_isActive: function(e) { this.$2 = e }, get_isDashboard: function() { return this.$7 === 'dashboard' }, get_isStory: function() { return this.$7 === 'story' }, get_sheetType: function() { return this.$7 }, get_parentStoryPoint: function() { if (ss.isValue(this.$6)) { return this.$6.get_storyPoint() } return null }, get_parentStoryPointImpl: function() { return this.$6 }, set_parentStoryPointImpl: function(e) { if (this.$7 === 'story') { throw tab._TableauException.createInternalError('A story cannot be a child of another story.') }
                this.$6 = e }, get_zoneId: function() { return this.$b }, get_messagingOptions: function() { return this.$4 }, changeSizeAsync: function(e) { e = g.$1(e); if (this.$7 === 'worksheet' && e.behavior !== 'automatic') { throw tab._TableauException.createInvalidSizeBehaviorOnWorksheet() } var bn = new tab._Deferred; if (this.$8.behavior === e.behavior && e.behavior === 'automatic') { bn.resolve(e); return bn.get_promise() } var bo = this.$0(e); var bp = {};
                bp['api.setSheetSizeName'] = this.$5;
                bp['api.minWidth'] = bo['api.minWidth'];
                bp['api.minHeight'] = bo['api.minHeight'];
                bp['api.maxWidth'] = bo['api.maxWidth'];
                bp['api.maxHeight'] = bo['api.maxHeight']; var bq = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.SetSheetSizeCommand', 0, ss.mkdel(this, function(br) { this.get_workbookImpl()._update(ss.mkdel(this, function() { var bs = this.get_workbookImpl().get_publishedSheets()._get(this.get_name()).getSize();
                        bn.resolve(bs) })) }), function(br, bs) { bn.reject(tab._TableauException.createServerError(bs)) });
                this.sendCommand(Object).call(this, bp, bq); return bn.get_promise() }, sendCommand: function(e) { return function(bn, bo) { this.$4.sendCommand(e).call(this.$4, bn, bo) } }, $0: function(e) { var bn = null; if (ss.isNullOrUndefined(e) || ss.isNullOrUndefined(e.behavior) || e.behavior !== 'automatic' && ss.isNullOrUndefined(e.minSize) && ss.isNullOrUndefined(e.maxSize)) { throw tab._TableauException.createInvalidSheetSizeParam() } var bo = 0; var bp = 0; var bq = 0; var br = 0; var bs = {};
                bs['api.minWidth'] = 0;
                bs['api.minHeight'] = 0;
                bs['api.maxWidth'] = 0;
                bs['api.maxHeight'] = 0; if (e.behavior === 'automatic') { bn = tab.SheetSize.$ctor('automatic', undefined, undefined) } else if (e.behavior === 'atmost') { if (ss.isNullOrUndefined(e.maxSize) || ss.isNullOrUndefined(e.maxSize.width) || ss.isNullOrUndefined(e.maxSize.height)) { throw tab._TableauException.createMissingMaxSize() } if (e.maxSize.width < 0 || e.maxSize.height < 0) { throw tab._TableauException.createInvalidSizeValue() }
                    bs['api.maxWidth'] = e.maxSize.width;
                    bs['api.maxHeight'] = e.maxSize.height;
                    bn = tab.SheetSize.$ctor('atmost', undefined, e.maxSize) } else if (e.behavior === 'atleast') { if (ss.isNullOrUndefined(e.minSize) || ss.isNullOrUndefined(e.minSize.width) || ss.isNullOrUndefined(e.minSize.height)) { throw tab._TableauException.createMissingMinSize() } if (e.minSize.width < 0 || e.minSize.height < 0) { throw tab._TableauException.createInvalidSizeValue() }
                    bs['api.minWidth'] = e.minSize.width;
                    bs['api.minHeight'] = e.minSize.height;
                    bn = tab.SheetSize.$ctor('atleast', e.minSize, undefined) } else if (e.behavior === 'range') { if (ss.isNullOrUndefined(e.minSize) || ss.isNullOrUndefined(e.maxSize) || ss.isNullOrUndefined(e.minSize.width) || ss.isNullOrUndefined(e.maxSize.width) || ss.isNullOrUndefined(e.minSize.height) || ss.isNullOrUndefined(e.maxSize.height)) { throw tab._TableauException.createMissingMinMaxSize() } if (e.minSize.width < 0 || e.minSize.height < 0 || e.maxSize.width < 0 || e.maxSize.height < 0 || e.minSize.width > e.maxSize.width || e.minSize.height > e.maxSize.height) { throw tab._TableauException.createInvalidRangeSize() }
                    bs['api.minWidth'] = e.minSize.width;
                    bs['api.minHeight'] = e.minSize.height;
                    bs['api.maxWidth'] = e.maxSize.width;
                    bs['api.maxHeight'] = e.maxSize.height;
                    bn = tab.SheetSize.$ctor('range', e.minSize, e.maxSize) } else if (e.behavior === 'exactly') { if (ss.isValue(e.minSize) && ss.isValue(e.maxSize) && ss.isValue(e.minSize.width) && ss.isValue(e.maxSize.width) && ss.isValue(e.minSize.height) && ss.isValue(e.maxSize.height)) { bo = e.minSize.width;
                        bp = e.minSize.height;
                        bq = e.maxSize.width;
                        br = e.maxSize.height; if (bo !== bq || bp !== br) { throw tab._TableauException.createSizeConflictForExactly() } } else if (ss.isValue(e.minSize) && ss.isValue(e.minSize.width) && ss.isValue(e.minSize.height)) { bo = e.minSize.width;
                        bp = e.minSize.height;
                        bq = bo;
                        br = bp } else if (ss.isValue(e.maxSize) && ss.isValue(e.maxSize.width) && ss.isValue(e.maxSize.height)) { bq = e.maxSize.width;
                        br = e.maxSize.height;
                        bo = bq;
                        bp = br }
                    bs['api.minWidth'] = bo;
                    bs['api.minHeight'] = bp;
                    bs['api.maxWidth'] = bq;
                    bs['api.maxHeight'] = br;
                    bn = tab.SheetSize.$ctor('exactly', tab.Size.$ctor(bo, bp), tab.Size.$ctor(bq, br)) }
                this.$8 = bn; return bs } }, { $0: function(e) { if (ss.isValue(e)) { return tab._Utility.toInt(e) } return e }, $1: function(e) { var bn = tab.PublicEnums.normalizeEnum(tab.ApiSheetSizeBehavior).call(null, e.behavior, 'size.behavior'); var bo = e.minSize; if (ss.isValue(bo)) { bo = tab.Size.$ctor(g.$0(e.minSize.width), g.$0(e.minSize.height)) } var bp = e.maxSize; if (ss.isValue(bp)) { bp = tab.Size.$ctor(g.$0(e.maxSize.width), g.$0(e.maxSize.height)) } return tab.SheetSize.$ctor(bn, bo, bp) } }); var h = global.tab._SheetInfoImpl = ss.mkType(a, 'tab._SheetInfoImpl', null, null, { $ctor: function(e, bn, bo, bp, bq, br, bs, bt, bu) { var bv = new Object;
                bv.name = null;
                bv.index = 0;
                bv.workbook = null;
                bv.url = null;
                bv.isHidden = false;
                bv.sheetType = null;
                bv.zoneId = 0;
                bv.size = null;
                bv.isActive = false;
                bv.name = e;
                bv.sheetType = bn;
                bv.index = bo;
                bv.size = bp;
                bv.workbook = bq;
                bv.url = br;
                bv.isActive = bs;
                bv.isHidden = bt;
                bv.zoneId = bu; return bv }, isInstanceOfType: function() { return true } }); var i = global.tab._StoryImpl = ss.mkType(a, 'tab._StoryImpl', function(e, bn, bo, bp, bq) { this.$g = null;
            this.$h = null;
            this.$i = null;
            this.$j = null;
            this.$2$1 = null;
            g.call(this, e, bn, bo);
            tab._Param.verifyValue(bp, 'storyPm');
            tab._Param.verifyValue(bq, 'findSheetFunc');
            this.$h = bq;
            this.update(bp) }, { add_activeStoryPointChange: function(e) { this.$2$1 = ss.delegateCombine(this.$2$1, e) }, remove_activeStoryPointChange: function(e) { this.$2$1 = ss.delegateRemove(this.$2$1, e) }, get_activeStoryPointImpl: function() { return this.$g }, get_sheet: function() { return this.get_story() }, get_story: function() { if (ss.isNullOrUndefined(this.$i)) { this.$i = new be(this) } return this.$i }, get_storyPointsInfo: function() { return this.$j }, update: function(e) { var bn = null; var bo = null;
                this.$j = this.$j || new Array(e.storyPoints.length); for (var bp = 0; bp < e.storyPoints.length; bp++) { var bq = e.storyPoints[bp]; var br = bq.caption; var bs = bp === e.activeStoryPointIndex; var bt = k.$ctor(br, bp, bq.storyPointId, bs, bq.isUpdated, this); if (ss.isNullOrUndefined(this.$j[bp])) { this.$j[bp] = new bg(bt) } else if (this.$j[bp]._impl.storyPointId === bt.storyPointId) { var bu = this.$j[bp]._impl;
                        bu.caption = bt.caption;
                        bu.index = bt.index;
                        bu.isActive = bs;
                        bu.isUpdated = bt.isUpdated } else { this.$j[bp] = new bg(bt) } if (bs) { bn = bq.containedSheetInfo;
                        bo = bt } } var bv = this.$j.length - e.storyPoints.length;
                this.$j.splice(e.storyPoints.length, bv); var bw = ss.isNullOrUndefined(this.$g) || this.$g.get_storyPointId() !== bo.storyPointId; if (ss.isValue(this.$g) && bw) { this.$g.set_isActive(false) } var bx = this.$g; if (bw) { var by = j.createContainedSheet(bn, this.get_workbookImpl(), this.get_messagingOptions(), this.$h);
                    this.$g = new j(bo, by) } else { this.$g.set_isActive(bo.isActive);
                    this.$g.set_isUpdated(bo.isUpdated) } if (bw && ss.isValue(bx)) { this.$d(this.$j[bx.get_index()], this.$g.get_storyPoint()) } }, activatePreviousStoryPointAsync: function() { return this.$c('api.ActivatePreviousStoryPoint') }, activateNextStoryPointAsync: function() { return this.$c('api.ActivateNextStoryPoint') }, activateStoryPointAsync: function(e) { var bn = new tab._Deferred; if (e < 0 || e >= this.$j.length) { throw tab._TableauException.createIndexOutOfRange(e) } var bo = {};
                bo['api.storyPointIndex'] = e; var bp = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.ActivateStoryPoint', 0, ss.mkdel(this, function(bq) { this.$e(bq);
                    bn.resolve(this.$g.get_storyPoint()) }), function(bq, br) { bn.reject(tab._TableauException.createServerError(br)) });
                this.sendCommand(Object).call(this, bo, bp); return bn.get_promise() }, revertStoryPointAsync: function(e) { e = e || this.$g.get_index(); if (e < 0 || e >= this.$j.length) { throw tab._TableauException.createIndexOutOfRange(e) } var bn = new tab._Deferred; var bo = {};
                bo['api.storyPointIndex'] = e; var bp = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.RevertStoryPoint', 0, ss.mkdel(this, function(bq) { this.$f(e, bq);
                    bn.resolve(this.$j[e]) }), function(bq, br) { bn.reject(tab._TableauException.createServerError(br)) });
                this.sendCommand(Object).call(this, bo, bp); return bn.get_promise() }, $c: function(e) { if (e !== 'api.ActivatePreviousStoryPoint' && e !== 'api.ActivateNextStoryPoint') { throw tab._TableauException.createInternalError("commandName '" + e + "' is invalid.") } var bn = new tab._Deferred; var bo = {}; var bp = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(e, 0, ss.mkdel(this, function(bq) { this.$e(bq);
                    bn.resolve(this.$g.get_storyPoint()) }), function(bq, br) { bn.reject(tab._TableauException.createServerError(br)) });
                this.sendCommand(Object).call(this, bo, bp); return bn.get_promise() }, $f: function(e, bn) { var bo = this.$j[e]._impl; if (bo.storyPointId !== bn.storyPointId) { throw tab._TableauException.createInternalError("We should not be updating a story point where the IDs don't match. Existing storyPointID=" + bo.storyPointId + ', newStoryPointID=' + bn.storyPointId) }
                bo.caption = bn.caption;
                bo.isUpdated = bn.isUpdated; if (bn.storyPointId === this.$g.get_storyPointId()) { this.$g.set_isUpdated(bn.isUpdated) } }, $e: function(e) { var bn = this.$g; var bo = e.index; if (bn.get_index() === bo) { return } var bp = this.$j[bn.get_index()]; var bq = this.$j[bo]._impl; var br = j.createContainedSheet(e.containedSheetInfo, this.get_workbookImpl(), this.get_messagingOptions(), this.$h);
                bq.isActive = true;
                this.$g = new j(bq, br);
                bn.set_isActive(false);
                bp._impl.isActive = false;
                this.$d(bp, this.$g.get_storyPoint()) }, $d: function(e, bn) { if (!ss.staticEquals(this.$2$1, null)) { this.$2$1(e, bn) } } }); var j = global.tab._StoryPointImpl = ss.mkType(a, 'tab._StoryPointImpl', function(e, bn) { this.$1 = null;
            this.$3 = 0;
            this.$4 = false;
            this.$5 = false;
            this.$2 = null;
            this.$6 = null;
            this.$7 = null;
            this.$8 = 0;
            this.$4 = e.isActive;
            this.$5 = e.isUpdated;
            this.$1 = e.caption;
            this.$3 = e.index;
            this.$6 = e.parentStoryImpl;
            this.$8 = e.storyPointId;
            this.$2 = bn; if (ss.isValue(bn)) { this.$2.set_parentStoryPointImpl(this); if (bn.get_sheetType() === 'dashboard') { var bo = this.$2; for (var bp = 0; bp < bo.get_worksheets().get__length(); bp++) { var bq = bo.get_worksheets().get_item(bp);
                        bq._impl.set_parentStoryPointImpl(this) } } } }, { get_caption: function() { return this.$1 }, get_containedSheetImpl: function() { return this.$2 }, get_index: function() { return this.$3 }, get_isActive: function() { return this.$4 }, set_isActive: function(e) { this.$4 = e }, get_isUpdated: function() { return this.$5 }, set_isUpdated: function(e) { this.$5 = e }, get_parentStoryImpl: function() { return this.$6 }, get_storyPoint: function() { if (ss.isNullOrUndefined(this.$7)) { this.$7 = new bf(this) } return this.$7 }, get_storyPointId: function() { return this.$8 }, $0: function() { return k.$ctor(this.$1, this.$3, this.$8, this.$4, this.$5, this.$6) } }, { createContainedSheet: function(e, bn, bo, bp) { if (ss.isNullOrUndefined(e) || ss.isNullOrUndefined(e.name)) { return null } var bq = tab.ApiEnumConverter.convertSheetType(e.sheetType); var br = -1; var bs = tab.SheetSizeFactory.createAutomatic(); var bt = false; var bu = bp(e.name); var bv = ss.isNullOrUndefined(bu); var bw = (bv ? '' : bu.getUrl()); var bx = h.$ctor(e.name, bq, br, bs, bn.get_workbook(), bw, bt, bv, e.zoneId); if (e.sheetType === 'worksheet') { var by = null; var bz = new p(bx, bn, bo, by); return bz } else if (e.sheetType === 'dashboard') { var bA = new d(bx, bn, bo); var bB = o.$0(e.dashboardZones);
                    bA.$c(bB, bp); return bA } else if (e.sheetType === 'story') { throw tab._TableauException.createInternalError('Cannot have a story embedded within another story.') } else { throw tab._TableauException.createInternalError("Unknown sheet type '" + e.sheetType + "'") } } }); var k = global.tab._StoryPointInfoImpl = ss.mkType(a, 'tab._StoryPointInfoImpl', null, null, { $ctor: function(e, bn, bo, bp, bq, br) { var bs = new Object;
                bs.storyPointId = 0;
                bs.parentStoryImpl = null;
                bs.caption = null;
                bs.index = 0;
                bs.isActive = false;
                bs.isUpdated = false;
                bs.caption = e;
                bs.index = bn;
                bs.storyPointId = bo;
                bs.isActive = bp;
                bs.isUpdated = bq;
                bs.parentStoryImpl = br; return bs }, isInstanceOfType: function() { return true } }); var l = global.tab._ToolbarStateImpl = ss.mkType(a, 'tab._ToolbarStateImpl', function(e, bn) { this.$0 = null;
            this.$2 = null;
            this.$1 = null;
            this.$2 = e;
            this.$1 = bn }, { get_toolbarState: function() { if (ss.isNullOrUndefined(this.$0)) { this.$0 = new bh(this) } return this.$0 }, get_viz: function() { return this.$2.$x() }, isButtonEnabled: function(e) { switch (e) {
                    case 'redo':
                        { return this.$1.canRedo }
                    case 'undo':
                        { return this.$1.canUndo }
                    default:
                        { throw tab._TableauException.createInvalidToolbarButtonName(e) } } } }); var m = ss.mkType(a, 'tab._VizManagerImpl', null, null, { $3: function() { return m.$6.concat() }, $0: function(e) { m.$4(e);
                m.$6.push(e) }, $2: function(e) { for (var bn = 0, bo = m.$6.length; bn < bo; bn++) { if (ss.referenceEquals(m.$6[bn], e)) { m.$6.splice(bn, 1); break } } }, $1: function() { for (var e = 0, bn = m.$6.length; e < bn; e++) { m.$6[e]._impl.$e() } }, $4: function(e) { var bn = e.getParentElement(); for (var bo = 0, bp = m.$6.length; bo < bp; bo++) { if (ss.referenceEquals(m.$6[bo].getParentElement(), bn)) { var bq = "Another viz is already present in element '" + tab._Utility.elementToString(bn) + "'."; throw tab._TableauException.create('vizAlreadyInManager', bq) } } } }); var n = global.tab._VizParameters = ss.mkType(a, 'tab._VizParameters', function(e, bn, bo) { this.name = '';
            this.host_url = null;
            this.tabs = false;
            this.toolbar = false;
            this.toolBarPosition = null;
            this.device = null;
            this.hostId = null;
            this.width = null;
            this.height = null;
            this.parentElement = null;
            this.userSuppliedParameters = null;
            this.staticImageUrl = null;
            this.fixedSize = false;
            this.displayStaticImage = false;
            this.$3 = null;
            this.$2 = null;
            this.$1 = false; if (ss.isNullOrUndefined(e) || ss.isNullOrUndefined(bn)) { throw tab._TableauException.create('noUrlOrParentElementNotFound', 'URL is empty or Parent element not found') } if (ss.isNullOrUndefined(bo)) { bo = new Object;
                bo.hideTabs = false;
                bo.hideToolbar = false;
                bo.onFirstInteractive = null } if (ss.isValue(bo.height) || ss.isValue(bo.width)) { this.fixedSize = true; if (tab._Utility.isNumber(bo.height)) { bo.height = bo.height.toString() + 'px' } if (tab._Utility.isNumber(bo.width)) { bo.width = bo.width.toString() + 'px' }
                this.height = (ss.isValue(bo.height) ? tab._Utility.roundVizSizeInPixels(bo.height.toString()) : null);
                this.width = (ss.isValue(bo.width) ? tab._Utility.roundVizSizeInPixels(bo.width.toString()) : null) } else { this.fixedSize = false }
            this.displayStaticImage = bo.displayStaticImage || false;
            this.staticImageUrl = bo.staticImageUrl || '';
            this.tabs = !(bo.hideTabs || false);
            this.toolbar = !(bo.hideToolbar || false);
            this.device = bo.device;
            this.parentElement = e;
            this.$2 = bo;
            this.toolBarPosition = bo.toolbarPosition;
            this.$1 = bo.disableUrlActionsPopups === true; var bp = bn.split('?');
            this.$3 = bp[0]; if (bp.length === 2) { this.userSuppliedParameters = bp[1] } else { this.userSuppliedParameters = '' } var bq = (new RegExp('.*?[^/:]/', '')).exec(this.$3); if (ss.isNullOrUndefined(bq) || bq[0].toLowerCase().indexOf('http://') === -1 && bq[0].toLowerCase().indexOf('https://') === -1) { throw tab._TableauException.create('invalidUrl', 'Invalid url') }
            this.host_url = bq[0].toLowerCase();
            this.name = this.$3.replace(bq[0], '');
            this.name = this.name.replace('views/', '') }, { get_url: function() { return this.$0() }, get_baseUrl: function() { return this.$3 }, $0: function() { var e = [];
                e.push(this.get_baseUrl());
                e.push('?'); if (this.userSuppliedParameters.length > 0) { e.push(this.userSuppliedParameters);
                    e.push('&') } var bn = !this.fixedSize && !(this.userSuppliedParameters.indexOf(':size=') !== -1) && this.parentElement.clientWidth * this.parentElement.clientHeight > 0; if (bn) { e.push(':size=');
                    e.push(this.parentElement.clientWidth + ',' + this.parentElement.clientHeight);
                    e.push('&') } if (!(this.userSuppliedParameters.indexOf(':embed=y') !== -1)) { e.push(':embed=y') }
                e.push('&:showVizHome=n'); if (!this.fixedSize) { e.push('&:bootstrapWhenNotified=y') } if (!this.tabs) { e.push('&:tabs=n') } if (this.displayStaticImage) { e.push('&:display_static_image=y') } if (this.$1) { e.push('&:disableUrlActionsPopups=y') } if (!this.toolbar) { e.push('&:toolbar=n') } else if (!ss.isNullOrUndefined(this.toolBarPosition)) { e.push('&:toolbar=');
                    e.push(this.toolBarPosition.toString()) } if (ss.isValue(this.device)) { e.push('&:device=');
                    e.push(this.device.toString()) } var bo = this.$2; var bp = new ss.ObjectEnumerator(bo); try { while (bp.moveNext()) { var bq = bp.current(); if (bq.key !== 'embed' && bq.key !== 'height' && bq.key !== 'width' && bq.key !== 'device' && bq.key !== 'autoSize' && bq.key !== 'hideTabs' && bq.key !== 'hideToolbar' && bq.key !== 'onFirstInteractive' && bq.key !== 'onFirstVizSizeKnown' && bq.key !== 'toolbarPosition' && bq.key !== 'instanceIdToClone' && bq.key !== 'navType' && bq.key !== 'display_static_image' && bq.key !== 'disableUrlActionsPopups') { e.push('&');
                            e.push(encodeURIComponent(bq.key));
                            e.push('=');
                            e.push(encodeURIComponent(bq.value.toString())) } } } finally { bp.dispose() }
                e.push('&:apiID=' + this.hostId);
                e.push('#'); if (ss.isValue(this.$2.instanceIdToClone)) { e.push(this.$2.instanceIdToClone + '&') } if (ss.isValue(this.$2.navType) && this.$2.navType.length > 0) { e.push('navType=' + this.$2.navType.toString() + '&');
                    e.push('navSrc=' + 'Opt'.toString()) } else { e.push('navType=' + window.performance.navigation.type.toString() + '&');
                    e.push('navSrc=' + 'Parse'.toString()) } return e.join('') } }); var o = global.tab._WorkbookImpl = ss.mkType(a, 'tab._WorkbookImpl', function(e, bn, bo) { this.$E = null;
            this.$D = null;
            this.$y = null;
            this.$s = null;
            this.$r = null;
            this.$A = new tab._Collection;
            this.$v = false;
            this.$x = null;
            this.$t = null;
            this.$u = new tab._Collection;
            this.$C = new tab._Collection;
            this.$B = new tab._Collection;
            this.$z = null;
            this.$w = null;
            this.$D = e;
            this.$x = bn;
            this.$n(bo) }, { get_workbook: function() { if (ss.isNullOrUndefined(this.$E)) { this.$E = new bl(this) } return this.$E }, get_viz: function() { return this.$D.$x() }, get_publishedSheets: function() { return this.$A }, get_name: function() { return this.$y }, get_activeSheetImpl: function() { return this.$s }, get_activeCustomView: function() { return this.$t }, get_isDownloadAllowed: function() { return this.$v }, $3: function(e) { if (ss.isNullOrUndefined(this.$s)) { return null } var bn = o.$1(e); if (ss.isNullOrUndefined(bn)) { return null } if (ss.referenceEquals(bn, this.$s.get_name())) { return this.$s } if (this.$s.get_isDashboard()) { var bo = this.$s; var bp = bo.get_worksheets()._get(bn); if (ss.isValue(bp)) { return bp._impl } } return null }, _setActiveSheetAsync: function(e) { if (tab._Utility.isNumber(e)) { var bn = e; if (bn < this.$A.get__length() && bn >= 0) { return this.$1(this.$A.get_item(bn).$0) } else { throw tab._TableauException.createIndexOutOfRange(bn) } } var bo = o.$1(e); var bp = this.$A._get(bo); if (ss.isValue(bp)) { return this.$1(bp.$0) } else if (this.$s.get_isDashboard()) { var bq = this.$s; var br = bq.get_worksheets()._get(bo); if (ss.isValue(br)) { this.$r = null; var bs = ''; if (br.getIsHidden()) { this.$r = br._impl } else { bs = br._impl.get_url() } return this.$0(br._impl.get_name(), bs) } } throw tab._TableauException.create('sheetNotInWorkbook', 'Sheet is not found in Workbook') }, _revertAllAsync: function() { var e = new tab._Deferred; var bn = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.RevertAllCommand', 1, function(bo) { e.resolve() }, function(bo, bp) { e.reject(tab._TableauException.createServerError(bp)) });
                this.$q(Object).call(this, null, bn); return e.get_promise() }, _update: function(e) { this.$n(e) }, $1: function(e) { return this.$0(e.name, e.url) }, $0: function(e, bn) { var bo = new tab._Deferred; if (ss.isValue(this.$s) && ss.referenceEquals(e, this.$s.get_name())) { bo.resolve(this.$s.get_sheet()); return bo.get_promise() } var bp = {};
                bp['api.switchToSheetName'] = e;
                bp['api.switchToRepositoryUrl'] = bn;
                bp['api.oldRepositoryUrl'] = this.$s.get_url(); var bq = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.SwitchActiveSheetCommand', 0, ss.mkdel(this, function(br) { this.$D.$A = ss.mkdel(this, function() { this.$D.$A = null;
                        bo.resolve(this.$s.get_sheet()) }) }), function(br, bs) { bo.reject(tab._TableauException.createServerError(bs)) });
                this.$q(Object).call(this, bp, bq); return bo.get_promise() }, _updateActiveSheetAsync: function() { var e = new tab._Deferred; var bn = {};
                bn['api.switchToSheetName'] = this.$s.get_name();
                bn['api.switchToRepositoryUrl'] = this.$s.get_url();
                bn['api.oldRepositoryUrl'] = this.$s.get_url(); var bo = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.UpdateActiveSheetCommand', 0, ss.mkdel(this, function(bp) { e.resolve(this.$s.get_sheet()) }), function(bp, bq) { e.reject(tab._TableauException.createServerError(bq)) });
                this.$q(Object).call(this, bn, bo); return e.get_promise() }, $q: function(e) { return function(bn, bo) { this.$x.sendCommand(e).call(this.$x, bn, bo) } }, $n: function(e) { var bn = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.GetClientInfoCommand', 0, ss.mkdel(this, function(bo) { this.$p(bo); if (ss.isValue(e)) { e() } }), null);
                this.$q(Object).call(this, null, bn) }, $p: function(e) { this.$y = e.workbookName;
                this.$v = e.isDownloadAllowed;
                this.$D.$f(!e.isAutoUpdate);
                this.$D.set_instanceId(e.instanceId);
                this.$m(e);
                this.$o(e) }, $o: function(e) { var bn = e.currentSheetName; var bo = this.$A._get(bn); if (ss.isNullOrUndefined(bo) && ss.isNullOrUndefined(this.$r)) { throw tab._TableauException.createInternalError('The active sheet was not specified in baseSheets') } if (ss.isValue(this.$s) && ss.referenceEquals(this.$s.get_name(), bn)) { return } if (ss.isValue(this.$s)) { this.$s.set_isActive(false); var bp = this.$A._get(this.$s.get_name()); if (ss.isValue(bp)) { bp.$0.isActive = false } if (this.$s.get_sheetType() === 'story') { var bq = this.$s;
                        bq.remove_activeStoryPointChange(ss.mkdel(this.$D, this.$D.raiseStoryPointSwitch)) } } if (ss.isValue(this.$r)) { var br = h.$ctor(this.$r.get_name(), 'worksheet', -1, this.$r.get_size(), this.get_workbook(), '', true, true, 4294967295);
                    this.$r = null;
                    this.$s = new p(br, this, this.$x, null) } else { var bs = null; for (var bt = 0, bu = e.publishedSheets.length; bt < bu; bt++) { if (ss.referenceEquals(e.publishedSheets[bt].name, bn)) { bs = e.publishedSheets[bt]; break } } if (ss.isNullOrUndefined(bs)) { throw tab._TableauException.createInternalError('No base sheet was found corresponding to the active sheet.') } var bv = ss.mkdel(this, function(bz) { return this.$A._get(bz) }); if (bs.sheetType === 'dashboard') { var bw = new d(bo.$0, this, this.$x);
                        this.$s = bw; var bx = o.$0(e.dashboardZones);
                        bw.$c(bx, bv) } else if (bs.sheetType === 'story') { var by = new i(bo.$0, this, this.$x, e.story, bv);
                        this.$s = by;
                        by.add_activeStoryPointChange(ss.mkdel(this.$D, this.$D.raiseStoryPointSwitch)) } else { this.$s = new p(bo.$0, this, this.$x, null) }
                    bo.$0.isActive = true }
                this.$s.set_isActive(true) }, $m: function(e) { var bn = e.publishedSheets; if (ss.isNullOrUndefined(bn)) { return } for (var bo = 0; bo < bn.length; bo++) { var bp = bn[bo]; var bq = bp.name; var br = this.$A._get(bq); var bs = o.$2(bp); if (ss.isNullOrUndefined(br)) { var bt = ss.referenceEquals(bq, e.currentSheetName); var bu = tab.ApiEnumConverter.convertSheetType(bp.sheetType); var bv = h.$ctor(bq, bu, bo, bs, this.get_workbook(), bp.repositoryUrl, bt, false, 4294967295);
                        br = new bd(bv);
                        this.$A._add(bq, br) } else { br.$0.size = bs } } }, $d: function() { return this.$u }, $e: function(e) { this.$u = e }, $k: function() { return this.$C }, $l: function(e) { this.$C = e }, $i: function() { return this.$B }, $j: function(e) { this.$B = e }, $b: function() { return this.$t }, $c: function(e) { this.$t = e }, $4: function() { return c._getCustomViewsAsync(this, this.$x) }, $a: function(e) { if (ss.isNullOrUndefined(e) || tab._Utility.isNullOrEmpty(e)) { return c._showCustomViewAsync(this, this.$x, null) } else { var bn = this.$u._get(e); if (ss.isNullOrUndefined(bn)) { var bo = new tab._Deferred;
                        bo.reject(tab._TableauException.createInvalidCustomViewName(e)); return bo.get_promise() } return bn._impl._showAsync() } }, $8: function(e) { if (tab._Utility.isNullOrEmpty(e)) { throw tab._TableauException.createNullOrEmptyParameter('customViewName') } var bn = this.$u._get(e); if (ss.isNullOrUndefined(bn)) { var bo = new tab._Deferred;
                    bo.reject(tab._TableauException.createInvalidCustomViewName(e)); return bo.get_promise() } return bn._impl.$1() }, $7: function(e) { if (tab._Utility.isNullOrEmpty(e)) { throw tab._TableauException.createInvalidParameter('customViewName') } return c._saveNewAsync(this, this.$x, e) }, $9: function() { return c._makeCurrentCustomViewDefaultAsync(this, this.$x) }, $f: function() { return this.$w }, $g: function(e) { this.$w = e }, $h: function() { return this.$z }, $6: function(e) { var bn = new tab._Deferred; if (ss.isValue(this.$w)) { bn.resolve(this.$w.$8()); return bn.get_promise() } var bo = {}; var bp = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.FetchParametersCommand', 0, ss.mkdel(this, function(bq) { var br = o.$3(e, bq);
                    this.$w = br;
                    bn.resolve(br.$8()) }), function(bq, br) { bn.reject(tab._TableauException.createServerError(br)) });
                this.$q(Object).call(this, bo, bp); return bn.get_promise() }, $5: function() { var e = new tab._Deferred; var bn = {}; var bo = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.FetchParametersCommand', 0, ss.mkdel(this, function(bp) { this.$z = o.$4(bp);
                    e.resolve(this.$h()._toApiCollection()) }), function(bp, bq) { e.reject(tab._TableauException.createServerError(bq)) });
                this.$q(Object).call(this, bn, bo); return e.get_promise() }, $2: function(e, bn) { var bo = new tab._Deferred; var bp = null; if (ss.isValue(this.$z)) { if (ss.isNullOrUndefined(this.$z._get(e))) { bo.reject(tab._TableauException.createInvalidParameter(e)); return bo.get_promise() }
                    bp = this.$z._get(e)._impl; if (ss.isNullOrUndefined(bp)) { bo.reject(tab._TableauException.createInvalidParameter(e)); return bo.get_promise() } } var bq = {};
                bq['api.setParameterName'] = (ss.isValue(this.$z) ? bp.$7() : e); if (ss.isValue(bn) && tab._Utility.isDate(bn)) { var br = bn; var bs = tab._Utility.serializeDateForServer(br);
                    bq['api.setParameterValue'] = bs } else { bq['api.setParameterValue'] = (ss.isValue(bn) ? bn.toString() : null) }
                this.$w = null; var bt = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.SetParameterValueCommand', 0, ss.mkdel(this, function(bu) { if (ss.isNullOrUndefined(bu)) { bo.reject(tab._TableauException.create('serverError', 'server error')); return } if (!bu.isValidPresModel) { bo.reject(tab._TableauException.createInvalidParameter(e)); return } var bv = new w(bu);
                    this.$w = bv;
                    bo.resolve(bv.$8()) }), function(bu, bv) { bo.reject(tab._TableauException.createInvalidParameter(e)) });
                this.$q(Object).call(this, bq, bt); return bo.get_promise() } }, { $0: function(e) { e = ss.coalesce(e, []); var bn = []; for (var bo = 0; bo < e.length; bo++) { var bp = e[bo]; var bq = tab.ApiEnumConverter.convertDashboardObjectType(bp.zoneType); var br = tab.Size.$ctor(bp.width, bp.height); var bs = tab.Point.$ctor(bp.x, bp.y); var bt = bp.name; var bu = { name: bt, objectType: bq, position: bs, size: br, zoneId: bp.zoneId };
                    bn.push(bu) } return bn }, $1: function(e) { if (ss.isNullOrUndefined(e)) { return null } if (tab._Utility.isString(e)) { return e } var bn = ss.safeCast(e, bc); if (ss.isValue(bn)) { return bn.getName() } var bo = ss.safeCast(e, bd); if (ss.isValue(bo)) { return bo.getName() } return null }, $2: function(e) { if (ss.isNullOrUndefined(e)) { return tab.SheetSizeFactory.createAutomatic() } return tab.SheetSizeFactory.fromSizeConstraints(e.sizeConstraints) }, $4: function(e) { var bn = new tab._Collection; for (var bo = 0; bo < e.parameters.length; bo++) { var bp = e.parameters[bo]; var bq = new w(bp);
                    bn._add(bq.$7(), bq.$8()) } return bn }, $3: function(e, bn) { for (var bo = 0; bo < bn.parameters.length; bo++) { var bp = bn.parameters[bo]; if (ss.referenceEquals(bp.name, e)) { return new w(bp) } } return null } }); var p = global.tab._WorksheetImpl = ss.mkType(a, 'tab._WorksheetImpl', function(e, bn, bo, bp) { this.$P = null;
            this.$M = null;
            this.$L = new tab.GetDataCommandsBuilder;
            this.$J = new tab.FilterCommandsBuilder;
            this.$O = new tab.SharedUtils;
            this.$K = new tab._Collection;
            this.$N = new tab._Collection;
            this.highlightedMarks = null;
            g.call(this, e, bn, bo);
            this.$M = bp }, { get_sheet: function() { return this.get_worksheet() }, get_worksheet: function() { if (ss.isNullOrUndefined(this.$P)) { this.$P = new bm(this) } return this.$P }, get_parentDashboardImpl: function() { return this.$M }, get_parentDashboard: function() { if (ss.isValue(this.$M)) { return this.$M.get_dashboard() } return null }, $k: function() { this.$I(); var e = new tab._Deferred; var bn = {};
                bn['api.worksheetName'] = this.get_name(); var bo = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.GetDataSourcesCommand', 0, function(bp) { var bq = f.processDataSourcesForWorksheet(bp);
                    e.resolve(bq._toApiCollection()) }, function(bp, bq) { e.reject(tab._TableauException.createServerError(bq)) });
                this.sendCommand(Object).call(this, bn, bo); return e.get_promise() }, $j: function(e) { this.$I(); var bn = new tab._Deferred; var bo = {};
                bo['api.dataSourceName'] = e;
                bo['api.worksheetName'] = this.get_name(); var bp = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.GetDataSourceCommand', 0, function(bq) { var br = f.processDataSource(bq); if (ss.isValue(br)) { bn.resolve(br.get_dataSource()) } else { bn.reject(tab._TableauException.createServerError("Data source '" + e + "' not found")) } }, function(bq, br) { bn.reject(tab._TableauException.createServerError(br)) });
                this.sendCommand(Object).call(this, bo, bp); return bn.get_promise() }, $I: function() { var e = this.get_isActive(); var bn = ss.isValue(this.$M) && this.$M.get_isActive(); var bo = ss.isValue(this.get_parentStoryPointImpl()) && this.get_parentStoryPointImpl().get_parentStoryImpl().get_isActive(); if (!e && !bn && !bo) { throw tab._TableauException.createNotActiveSheet() } }, $x: function(e) { if (ss.isValue(this.get_parentStoryPointImpl())) { var bn = {};
                    bn.worksheet = this.get_name();
                    bn.dashboard = (ss.isValue(this.get_parentDashboardImpl()) ? this.$M.get_name() : this.get_name());
                    bn.flipboardZoneId = this.get_parentStoryPointImpl().get_containedSheetImpl().get_zoneId();
                    bn.storyboard = this.get_parentStoryPointImpl().get_parentStoryImpl().get_name();
                    bn.storyPointId = this.get_parentStoryPointImpl().get_storyPointId();
                    e['api.visualId'] = bn } else { var bo = (ss.isValue(this.get_parentDashboardImpl()) ? this.get_parentDashboardImpl().get_name() : null);
                    this.$O.addVisualIdForWorksheet(e, this.get_name(), bo) } }, get__filters: function() { return this.$K }, set__filters: function(e) { this.$K = e }, $l: function(e, bn, bo) { if (!tab._Utility.isNullOrEmpty(e) && !tab._Utility.isNullOrEmpty(bn)) { throw tab._TableauException.createInternalError('Only fieldName OR fieldCaption is allowed, not both.') }
                bo = bo || new Object; var bp = new tab._Deferred; var bq = {};
                this.$x(bq); if (!tab._Utility.isNullOrEmpty(bn) && tab._Utility.isNullOrEmpty(e)) { bq['api.fieldCaption'] = bn } if (!tab._Utility.isNullOrEmpty(e)) { bq['api.fieldName'] = e }
                bq['api.filterHierarchicalLevels'] = 0;
                bq['api.ignoreDomain'] = bo.ignoreDomain || false;
                bq['api.filterRelevantValuesOnly'] = (ss.isNullOrUndefined(bo.relevantValuesOnly) ? true : bo.relevantValuesOnly); var br = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.GetOneFilterInfoCommand', 0, ss.mkdel(this, function(bs) { var bt = p.$0(bs); if (ss.isNullOrUndefined(bt)) { var bu = bs; var bv = X.$0(this, bu);
                        bp.resolve(bv) } else { bp.reject(bt) } }), function(bs, bt) { bp.reject(tab._TableauException.createServerError(bt)) });
                this.sendCommand(Object).call(this, bq, br); return bp.get_promise() }, $m: function(e) { this.$I();
                e = e || new Object; var bn = new tab._Deferred; var bo = {};
                this.$x(bo);
                bo['api.ignoreDomain'] = e.ignoreDomain || false;
                bo['api.filterRelevantValuesOnly'] = (ss.isNullOrUndefined(e.relevantValuesOnly) ? true : e.relevantValuesOnly); var bp = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.GetFiltersListCommand', 0, ss.mkdel(this, function(bq) { this.set__filters(X.processFiltersList(this, bq));
                    bn.resolve(this.get__filters()._toApiCollection()) }), function(bq, br) { bn.reject(tab._TableauException.createServerError(br)) });
                this.sendCommand(Object).call(this, bo, bp); return bn.get_promise() }, $c: function(e, bn, bo, bp) { return this.$y(e, bn, bo, bp) }, $g: function(e) { return this.$C(e) }, $e: function(e, bn) { var bo = this.$J.normalizeRangeFilterOption(bn); return this.$A(e, bo) }, $f: function(e, bn) { var bo = this.$J.normalizeRelativeDateFilterOptions(bn); return this.$B(e, bo) }, $d: function(e, bn, bo, bp) { if (ss.isNullOrUndefined(bn) && bo !== 'all') { throw tab._TableauException.createInvalidParameter('values') } return this.$z(e, bn, bo, bp) }, $C: function(e) { this.$I(); var bn = new tab._Deferred; var bo = this.$J.buildClearFilterCommandsParam(e);
                this.$x(bo); var bp = this.$J.createFilterCommandReturnHandler('api.ClearFilterCommand', e, bn);
                this.sendCommand(Object).call(this, bo, bp); return bn.get_promise() }, $y: function(e, bn, bo, bp) { this.$I(); var bq = new tab._Deferred; var br = this.$J.buildApplyFiltersCommandParams(e, bn, bo, bp);
                this.$x(br); var bs = this.$J.createFilterCommandReturnHandler('api.ApplyCategoricalFilterCommand', e, bq);
                this.sendCommand(Object).call(this, br, bs); return bq.get_promise() }, $A: function(e, bn) { this.$I(); var bo = this.$J.buildRangeFilterCommandParams(e, bn);
                this.$x(bo); var bp = new tab._Deferred; var bq = this.$J.createFilterCommandReturnHandler('api.ApplyRangeFilterCommand', e, bp);
                this.sendCommand(Object).call(this, bo, bq); return bp.get_promise() }, $B: function(e, bn) { this.$I(); var bo = this.$J.buildRelativeDateFilterCommandParams(e, bn);
                this.$x(bo); var bp = new tab._Deferred; var bq = this.$J.createFilterCommandReturnHandler('api.ApplyRelativeDateFilterCommand', e, bp);
                this.sendCommand(Object).call(this, bo, bq); return bp.get_promise() }, $z: function(e, bn, bo, bp) { this.$I(); var bq = this.$J.buildHierarchicalFilterCommandParams(e, bn, bo, bp);
                this.$x(bq); var br = new tab._Deferred; var bs = this.$J.createFilterCommandReturnHandler('api.ApplyHierarchicalFilterCommand', e, br);
                this.sendCommand(Object).call(this, bq, bs); return br.get_promise() }, get_selectedMarks: function() { return this.$N }, set_selectedMarks: function(e) { this.$N = e }, $i: function() { this.$I(); var e = new tab._Deferred; var bn = {};
                this.$x(bn); var bo = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.ClearSelectedMarksCommand', 0, function(bp) { e.resolve() }, function(bp, bq) { e.reject(tab._TableauException.createServerError(bq)) });
                this.sendCommand(Object).call(this, bn, bo); return e.get_promise() }, $v: function(e, bn, bo) { this.$I(); if (ss.isNullOrUndefined(e) && ss.isNullOrUndefined(bn)) { return this.$i() } if (tab._Utility.isString(e) && (tab._jQueryShim.isArray(bn) || tab._Utility.isString(bn) || !tab.PublicEnums.isValidEnum(tab.ApiSelectionUpdateType).call(null, bn))) { return this.$E(e, bn, bo) } else if (tab._jQueryShim.isArray(e)) { return this.$F(e, bn) } else { return this.$G(e, bn) } }, $o: function() { this.$I(); var e = new tab._Deferred; var bn = {};
                this.$x(bn); var bo = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.FetchSelectedMarksCommand', 0, ss.mkdel(this, function(bp) { this.$N = tab.MarkImpl.processActiveMarks(bp);
                    e.resolve(this.$N._toApiCollection()) }), function(bp, bq) { e.reject(tab._TableauException.createServerError(bq)) });
                this.sendCommand(Object).call(this, bn, bo); return e.get_promise() }, $E: function(e, bn, bo) { var bp = []; var bq = []; var br = []; var bs = []; var bt = []; var bu = [];
                this.$D(bp, bq, br, bs, bt, bu, e, bn); return this.$H(null, bp, bq, br, bs, bt, bu, bo) }, $G: function(e, bn) { var bo = e; var bp = []; var bq = []; var br = []; var bs = []; var bt = []; var bu = []; var bv = new ss.ObjectEnumerator(bo); try { while (bv.moveNext()) { var bw = bv.current(); if (e.hasOwnProperty(bw.key)) { if (!tab._jQueryShim.isFunction(bo[bw.key])) { this.$D(bp, bq, br, bs, bt, bu, bw.key, bw.value) } } } } finally { bv.dispose() } return this.$H(null, bp, bq, br, bs, bt, bu, bn) }, $F: function(e, bn) { var bo = []; var bp = []; var bq = []; var br = []; var bs = []; var bt = []; var bu = []; for (var bv = 0; bv < e.length; bv++) { var bw = e[bv]; if (ss.isValue(bw.impl.get_tupleId()) && bw.impl.get_tupleId() > 0) { bu.push(bw.impl.get_tupleId()) } else { var bx = bw.impl.get_pairs(); for (var by = 0; by < bx.get__length(); by++) { var bz = bx.get_item(by); if (bz.hasOwnProperty('fieldName') && bz.hasOwnProperty('value') && !tab._jQueryShim.isFunction(bz.fieldName) && !tab._jQueryShim.isFunction(bz.value)) { this.$D(bo, bp, bq, br, bs, bt, bz.fieldName, bz.value) } } } } return this.$H(bu, bo, bp, bq, br, bs, bt, bn) }, $D: function(e, bn, bo, bp, bq, br, bs, bt) { var bu = bt; if (p.$3.test(bs)) { this.$w(bo, bp, bs, bt) } else if (ss.isValue(bu.min) || ss.isValue(bu.max)) { var bv = new Object; if (ss.isValue(bu.min)) { if (tab._Utility.isDate(bu.min)) { var bw = bu.min; if (tab._Utility.isDateValid(bw)) { bv.min = tab._Utility.serializeDateForServer(bw) } else { throw tab._TableauException.createInvalidDateParameter('options.min') } } else { bv.min = bu.min } } if (ss.isValue(bu.max)) { if (tab._Utility.isDate(bu.max)) { var bx = bu.max; if (tab._Utility.isDateValid(bx)) { bv.max = tab._Utility.serializeDateForServer(bx) } else { throw tab._TableauException.createInvalidDateParameter('options.max') } } else { bv.max = bu.max } } if (ss.isValue(bu.nullOption)) { var by = tab.PublicEnums.normalizeEnum(tab.ApiNullOption).call(null, bu.nullOption, 'options.nullOption');
                        bv.nullOption = by } else { bv.nullOption = 'allValues' } var bz = JSON.stringify(bv);
                    this.$w(bq, br, bs, bz) } else { this.$w(e, bn, bs, bt) } }, $w: function(e, bn, bo, bp) { var bq = []; if (tab._jQueryShim.isArray(bp)) { var br = bp; for (var bs = 0; bs < br.length; bs++) { bq.push(br[bs].toString()) } } else { bq.push(bp.toString()) }
                bn.push(bq);
                e.push(bo) }, $H: function(e, bn, bo, bp, bq, br, bs, bt) { var bu = {};
                this.$x(bu);
                bt = tab.PublicEnums.normalizeEnum(tab.ApiSelectionUpdateType).call(null, bt, 'updateType');
                bu['api.filterUpdateType'] = bt; if (!tab._Utility.isNullOrEmpty(e)) { bu['api.tupleIds'] = JSON.stringify(e) } if (!tab._Utility.isNullOrEmpty(bn) && !tab._Utility.isNullOrEmpty(bo)) { bu['api.categoricalFieldCaption'] = JSON.stringify(bn); var bv = []; for (var bw = 0; bw < bo.length; bw++) { var bx = JSON.stringify(bo[bw]);
                        bv.push(bx) }
                    bu['api.categoricalMarkValues'] = JSON.stringify(bv) } if (!tab._Utility.isNullOrEmpty(bp) && !tab._Utility.isNullOrEmpty(bq)) { bu['api.hierarchicalFieldCaption'] = JSON.stringify(bp); var by = []; for (var bz = 0; bz < bq.length; bz++) { var bA = JSON.stringify(bq[bz]);
                        by.push(bA) }
                    bu['api.hierarchicalMarkValues'] = JSON.stringify(by) } if (!tab._Utility.isNullOrEmpty(br) && !tab._Utility.isNullOrEmpty(bs)) { bu['api.rangeFieldCaption'] = JSON.stringify(br); var bB = []; for (var bC = 0; bC < bs.length; bC++) { var bD = JSON.stringify(bs[bC]);
                        bB.push(bD) }
                    bu['api.rangeMarkValues'] = JSON.stringify(bB) } if (tab._Utility.isNullOrEmpty(bu['api.tupleIds']) && tab._Utility.isNullOrEmpty(bu['api.categoricalFieldCaption']) && tab._Utility.isNullOrEmpty(bu['api.hierarchicalFieldCaption']) && tab._Utility.isNullOrEmpty(bu['api.rangeFieldCaption'])) { throw tab._TableauException.createInvalidParameter('fieldNameOrFieldValuesMap') } var bE = new tab._Deferred; var bF = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.SelectMarksCommand', 0, function(bG) { var bH = p.$1(bG); if (ss.isNullOrUndefined(bH)) { bE.resolve() } else { bE.reject(bH) } }, function(bG, bH) { bE.reject(tab._TableauException.createServerError(bH)) });
                this.sendCommand(Object).call(this, bu, bF); return bE.get_promise() }, $p: function(e) { this.$I(); var bn = new tab._Deferred; var bo = this.$L.getSummaryDataCommandParams(e);
                this.$x(bo); var bp = this.$L.getSummaryDataResponseHandler(bn);
                this.sendCommand(Object).call(this, bo, bp); return bn.get_promise() }, $q: function(e) { this.$I(); var bn = new tab._Deferred; var bo = this.$L.getUnderlyingDataCommandParams(e);
                this.$x(bo); var bp = this.$L.getUnderlyingDataResponseHandler(bn);
                this.sendCommand(Object).call(this, bo, bp); return bn.get_promise() }, $s: function() { this.$I(); var e = new tab._Deferred; var bn = this.$L.getUnderlyingTablesCommandParams();
                this.$x(bn); var bo = this.$L.getUnderlyingTablesResponseHandler(e);
                this.sendCommand(Object).call(this, bn, bo); return e.get_promise() }, $r: function(e, bn) { this.$I(); var bo = new tab._Deferred; var bp = this.$L.getUnderlyingTableDataCommandParams(e, bn);
                this.$x(bp); var bq = this.$L.getUnderlyingTableDataResponseHandler(bo);
                this.sendCommand(Object).call(this, bp, bq); return bo.get_promise() }, $h: function() { this.$I(); var e = new tab._Deferred; var bn = {};
                this.$x(bn); var bo = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.ClearHighlightedMarksCommand', 0, function(bp) { e.resolve() }, function(bp, bq) { e.reject(tab._TableauException.createServerError(bq)) });
                this.sendCommand(Object).call(this, bn, bo); return e.get_promise() }, $t: function(e, bn) { tab._Param.verifyString(e, 'fieldName');
                this.$I(); var bo = new tab._Deferred; var bp = {};
                bp['api.fieldCaption'] = e;
                bp['api.ObjectTextIDs'] = bn;
                this.$x(bp); var bq = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.HighlightMarksCommand', 0, function(br) { bo.resolve() }, function(br, bs) { bo.reject(tab._TableauException.createServerError(bs)) });
                this.sendCommand(Object).call(this, bp, bq); return bo.get_promise() }, $u: function(e, bn) { tab._Param.verifyString(e, 'fieldName');
                tab._Param.verifyString(bn, 'patternMatch');
                this.$I(); var bo = new tab._Deferred; var bp = {};
                bp['api.filterUpdateType'] = 'replace';
                bp['api.fieldCaption'] = e;
                bp['api.Pattern'] = bn;
                this.$x(bp); var bq = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.HighlightMarksByPatternMatch', 0, function(br) { bo.resolve() }, function(br, bs) { bo.reject(tab._TableauException.createServerError(bs)) });
                this.sendCommand(Object).call(this, bp, bq); return bo.get_promise() }, $n: function() { this.$I(); var e = new tab._Deferred; var bn = {};
                this.$x(bn); var bo = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.FetchHighlightedMarksCommand', 0, ss.mkdel(this, function(bp) { this.highlightedMarks = tab.MarkImpl.processActiveMarks(bp);
                    e.resolve(this.highlightedMarks._toApiCollection()) }), function(bp, bq) { e.reject(tab._TableauException.createServerError(bq)) });
                this.sendCommand(Object).call(this, bn, bo); return e.get_promise() } }, { $0: function(e) { var bn = e; if (ss.isValue(bn) && ss.isValue(bn.errorCode)) { var bo = (ss.isValue(bn.additionalInformation) ? bn.additionalInformation.toString() : ''); switch (bn.errorCode) {
                        case 'invalidFilterFieldName':
                            { return tab._TableauException.create('invalidFilterFieldName', bo) }
                        case 'invalidFilterFieldValue':
                            { return tab._TableauException.create('invalidFilterFieldValue', bo) }
                        case 'invalidAggregationFieldName':
                            { return tab._TableauException.createInvalidAggregationFieldName(bo) }
                        default:
                            { return tab._TableauException.createServerError(bo) } } } return null }, $1: function(e) { var bn = e; if (ss.isValue(bn) && ss.isValue(bn.errorCode)) { var bo = (ss.isValue(bn.additionalInformation) ? bn.additionalInformation.toString() : ''); switch (bn.errorCode) {
                        case 'invalidSelectionFieldName':
                            { return tab._TableauException.create('invalidSelectionFieldName', bo) }
                        case 'invalidSelectionValue':
                            { return tab._TableauException.create('invalidSelectionValue', bo) }
                        case 'invalidSelectionDate':
                            { return tab._TableauException.create('invalidSelectionDate', bo) } } } return null } }); var q = ss.mkType(a, 'tab.$0', function(e, bn) { this.$2 = null;
            y.call(this, e, null);
            this.$2 = bn }, { get__customViewImpl: function() { return this.$2 } }); var r = ss.mkType(a, 'tab.$1', function(e, bn, bo, bp) { this.$3 = null;
            this.$4 = null;
            y.call(this, e, bn);
            this.$3 = bo;
            this.$4 = bp }, { get__filterFieldName: function() { return this.$3 }, $2: function() { return this.$4 } }); var s = ss.mkType(a, 'tab.$2', function(e, bn) { y.call(this, e, bn) }); var t = ss.mkType(a, 'tab.$3', function(e, bn) { y.call(this, e, bn) }); var u = ss.mkType(a, 'tab.$4', function(e, bn) { this.$2 = null;
            y.call(this, e, null);
            this.$2 = bn }, { get__parameterName: function() { return this.$2 } }); var v = ss.mkType(a, 'tab.$5', null, null, { isInstanceOfType: function() { return true } }); var w = ss.mkType(a, 'tab.$6', function(e) { this.$i = null;
            this.$h = null;
            this.$c = null;
            this.$d = null;
            this.$b = null;
            this.$a = null;
            this.$g = null;
            this.$f = null;
            this.$j = null;
            this.$e = null;
            this.$h = e.name;
            this.$c = tab._Utility.getDataValue(e.currentValue);
            this.$d = tab.ApiEnumConverter.convertParameterDataType(e.dataType);
            this.$b = tab.ApiEnumConverter.convertParameterAllowableValuesType(e.allowableValuesType); if (ss.isValue(e.allowableValues) && this.$b === 'list') { this.$a = []; for (var bn = 0; bn < e.allowableValues.length; bn++) { var bo = e.allowableValues[bn];
                    this.$a.push(tab._Utility.getDataValue(bo)) } } if (this.$b === 'range') { this.$g = tab._Utility.getDataValue(e.minValue);
                this.$f = tab._Utility.getDataValue(e.maxValue);
                this.$j = e.stepSize; if ((this.$d === 'date' || this.$d === 'datetime') && ss.isValue(this.$j) && ss.isValue(e.dateStepPeriod)) { this.$e = tab.ApiEnumConverter.convertPeriodType(e.dateStepPeriod) } } }, { $8: function() { if (ss.isNullOrUndefined(this.$i)) { this.$i = new Z(this) } return this.$i }, $7: function() { return this.$h }, $2: function() { return this.$c }, $3: function() { return this.$d }, $1: function() { return this.$b }, $0: function() { return this.$a }, $6: function() { return this.$g }, $5: function() { return this.$f }, $9: function() { return this.$j }, $4: function() { return this.$e } }); var x = global.tab.CustomViewEvent = ss.mkType(a, 'tab.CustomViewEvent', function(e, bn, bo) { this.$2 = null;
            J.call(this, e, bn);
            this.$2 = new q(bn._impl.get__workbookImpl(), bo) }, { getCustomViewAsync: function() { var e = new tab._Deferred; var bn = null; if (ss.isValue(this.$2.get__customViewImpl())) { bn = this.$2.get__customViewImpl().$4() }
                e.resolve(bn); return e.get_promise() } }); var y = global.tab.EventContext = ss.mkType(a, 'tab.EventContext', function(e, bn) { this.$0 = null;
            this.$1 = null;
            this.$0 = e;
            this.$1 = bn }, { get__workbookImpl: function() { return this.$0 }, get__worksheetImpl: function() { return this.$1 } }); var z = global.tab.FilterEvent = ss.mkType(a, 'tab.FilterEvent', function(e, bn, bo, bp, bq) { this.$4 = null;
            this.$3 = null;
            Q.call(this, e, bn, bo);
            this.$4 = bq;
            this.$3 = new r(bn._impl.get__workbookImpl(), bo, bp, bq) }, { getFieldName: function() { return this.$4 }, getFilterAsync: function() { return this.$3.get__worksheetImpl().$l(this.$3.get__filterFieldName(), null, null) } }); var A = global.tab.FirstVizSizeKnownEvent = ss.mkType(a, 'tab.FirstVizSizeKnownEvent', function(e, bn, bo) { this.$2 = null;
            J.call(this, e, bn);
            this.$2 = bo }, { getVizSize: function() { return this.$2 } }); var B = global.tab.HighlightEvent = ss.mkType(a, 'tab.HighlightEvent', function(e, bn, bo) { this.$3 = null;
            Q.call(this, e, bn, bo);
            this.$3 = new s(bn._impl.get__workbookImpl(), bo) }, { getHighlightedMarksAsync: function() { var e = this.$3.get__worksheetImpl(); return e.$n() } }); var C = global.tab.IJsApiMessageHandler = ss.mkType(a, 'tab.IJsApiMessageHandler'); var D = global.tab.JsApiMessageRouter = ss.mkType(a, 'tab.JsApiMessageRouter', function() { this.$3 = {};
            this.$2 = null; var e = ss.mkdel(this, function(bn, bo) { this.$1(bn, bo) });
            this.$2 = new tab.CrossDomainMessager(e) }, { registerHandler: function(e) { this.$2.registerHandler(e);
                e.add_customViewsListLoad(ss.mkdel(this, this.$0)) }, unregisterHandler: function(e) { this.$2.unregisterHandler(e);
                e.remove_customViewsListLoad(ss.mkdel(this, this.$0)) }, sendCommand: function(e) { return function(bn, bo, bp) { this.$2.sendCommand(e).call(this.$2, bn, bo, bp); if (bp.get_commandName() === 'api.ShowCustomViewCommand') { var bq = this.$3[bn.get_hostId()]; if (ss.isNullOrUndefined(bq)) { bq = [];
                            this.$3[bn.get_hostId()] = bq }
                        bq.push(bp) } } }, $0: function(e) { var bn = e.get_hostId(); var bo = this.$3[bn]; if (ss.isNullOrUndefined(bo)) { return } for (var bp = 0; bp < bo.length; bp++) { var bq = bo[bp]; if (!ss.staticEquals(bq.get_successCallback(), null)) { bq.get_successCallback()(null) } }
                delete this.$3[bn] }, $1: function(e, bn) { if (e.get_name() === 'layoutInfoReq') { m.$1() } else if (ss.isValue(bn)) { if (e.get_name() === 'tableau.completed' || e.get_name() === 'completed') { bn.handleVizLoad() } else if (e.get_name() === 'tableau.listening') { bn.handleVizListening() } else if (e.get_name() === 'sf?') { if (ss.count(e.get_parameters()) > 0) { var bo = ss.getItem(e.get_parameters(), 0);
                            bn.sendScaleFactor(bo) } } } } }); var E = global.tab.JsApiMessagingOptions = ss.mkType(a, 'tab.JsApiMessagingOptions', function(e, bn) { this.$1 = null;
            this.$0 = null;
            tab._Param.verifyValue(e, 'router');
            tab._Param.verifyValue(bn, 'handler');
            this.$1 = e;
            this.$0 = bn }, { get_handler: function() { return this.$0 }, get_router: function() { return this.$1 }, sendCommand: function(e) { return function(bn, bo) { this.$1.sendCommand(e).call(this.$1, this.$0, bn, bo) } }, dispose: function() { this.$1.unregisterHandler(this.$0) } }); var F = global.tab.MarksEvent = ss.mkType(a, 'tab.MarksEvent', function(e, bn, bo) { this.$3 = null;
            Q.call(this, e, bn, bo);
            this.$3 = new t(bn._impl.get__workbookImpl(), bo) }, { getMarksAsync: function() { var e = this.$3.get__worksheetImpl(); if (ss.isValue(e.get_selectedMarks())) { var bn = new tab._Deferred; return bn.resolve(e.get_selectedMarks()._toApiCollection()) } return e.$o() } }); var G = global.tab.ParameterEvent = ss.mkType(a, 'tab.ParameterEvent', function(e, bn, bo) { this.$2 = null;
            J.call(this, e, bn);
            this.$2 = new u(bn._impl.get__workbookImpl(), bo) }, { getParameterName: function() { return this.$2.get__parameterName() }, getParameterAsync: function() { return this.$2.get__workbookImpl().$6(this.$2.get__parameterName()) } }); var H = global.tab.StoryPointInfoImplUtil = ss.mkType(a, 'tab.StoryPointInfoImplUtil', null, null, { clone: function(e) { return k.$ctor(e.caption, e.index, e.storyPointId, e.isActive, e.isUpdated, e.parentStoryImpl) } }); var I = global.tab.StoryPointSwitchEvent = ss.mkType(a, 'tab.StoryPointSwitchEvent', function(e, bn, bo, bp) { this.$3 = null;
            this.$2 = null;
            J.call(this, e, bn);
            this.$3 = bo;
            this.$2 = bp }, { getOldStoryPointInfo: function() { return this.$3 }, getNewStoryPoint: function() { return this.$2 } }); var J = global.tab.TableauEvent = ss.mkType(a, 'tab.TableauEvent', function(e, bn) { this.$1 = null;
            this.$0 = null;
            this.$1 = bn;
            this.$0 = e }, { getViz: function() { return this.$1 }, getEventName: function() { return this.$0 } }); var K = global.tab.TabSwitchEvent = ss.mkType(a, 'tab.TabSwitchEvent', function(e, bn, bo, bp) { this.$3 = null;
            this.$2 = null;
            J.call(this, e, bn);
            this.$3 = bo;
            this.$2 = bp }, { getOldSheetName: function() { return this.$3 }, getNewSheetName: function() { return this.$2 } }); var L = global.tab.ToolbarStateEvent = ss.mkType(a, 'tab.ToolbarStateEvent', function(e, bn, bo) { this.$2 = null;
            J.call(this, e, bn);
            this.$2 = bo }, { getToolbarState: function() { return this.$2.get_toolbarState() } }); var M = global.tab.UrlActionEvent = ss.mkType(a, 'tab.UrlActionEvent', function(e, bn, bo, bp) { this.$3 = null;
            this.$2 = null;
            J.call(this, e, bn);
            this.$3 = bo;
            this.$2 = bp }, { getUrl: function() { return this.$3 }, getTarget: function() { return this.$2 } }); var N = global.tab.VizImpl = ss.mkType(a, 'tab.VizImpl', function(e, bn, bo, bp, bq) { this.$A = null;
            this.$1t = null;
            this.$1i = null;
            this.$1s = null;
            this.$1r = null;
            this.$1j = null;
            this.$1l = null;
            this.$1w = null;
            this.$1p = null;
            this.$1q = null;
            this.$1o = false;
            this.$1h = false;
            this.$1m = false;
            this.$1g = false;
            this.$1n = null;
            this.$1u = null;
            this.$1v = null;
            this.$1k = false;
            this.$1$1 = null;
            this.$1$2 = null;
            this.$1$3 = null;
            this.$1$4 = null;
            this.$1$5 = null;
            this.$1$6 = null;
            this.$1$7 = null;
            this.$1$8 = null;
            this.$1$9 = null;
            this.$1$10 = null;
            this.$1$11 = null;
            this.$1$12 = null;
            this.$1$13 = null;
            this.$1$14 = null;
            this.$1$15 = null; if (!tab._Utility.hasWindowPostMessage() || !tab._Utility.hasJsonParse()) { throw tab._TableauException.createBrowserNotCapable() }
            this.$1n = new E(e, this);
            this.$1t = bn; if (ss.isNullOrUndefined(bo) || bo.nodeType !== 1) { bo = document.body }
            this.$1r = new n(bo, bp, bq); if (ss.isValue(bq)) { this.$1p = bq.onFirstInteractive;
                this.$1q = bq.onFirstVizSizeKnown } }, { add_customViewsListLoad: function(e) { this.$1$1 = ss.delegateCombine(this.$1$1, e) }, remove_customViewsListLoad: function(e) { this.$1$1 = ss.delegateRemove(this.$1$1, e) }, add_stateReadyForQuery: function(e) { this.$1$2 = ss.delegateCombine(this.$1$2, e) }, remove_stateReadyForQuery: function(e) { this.$1$2 = ss.delegateRemove(this.$1$2, e) }, $1J: function(e) { this.$1$3 = ss.delegateCombine(this.$1$3, e) }, $1K: function(e) { this.$1$3 = ss.delegateRemove(this.$1$3, e) }, $1H: function(e) { this.$1$4 = ss.delegateCombine(this.$1$4, e) }, $1I: function(e) { this.$1$4 = ss.delegateRemove(this.$1$4, e) }, $1F: function(e) { this.$1$5 = ss.delegateCombine(this.$1$5, e) }, $1G: function(e) { this.$1$5 = ss.delegateRemove(this.$1$5, e) }, $1L: function(e) { this.$1$6 = ss.delegateCombine(this.$1$6, e) }, $1M: function(e) { this.$1$6 = ss.delegateRemove(this.$1$6, e) }, $1x: function(e) { this.$1$7 = ss.delegateCombine(this.$1$7, e) }, $1y: function(e) { this.$1$7 = ss.delegateRemove(this.$1$7, e) }, $1B: function(e) { this.$1$8 = ss.delegateCombine(this.$1$8, e) }, $1C: function(e) { this.$1$8 = ss.delegateRemove(this.$1$8, e) }, $1z: function(e) { this.$1$9 = ss.delegateCombine(this.$1$9, e) }, $1A: function(e) { this.$1$9 = ss.delegateRemove(this.$1$9, e) }, $1D: function(e) { this.$1$10 = ss.delegateCombine(this.$1$10, e) }, $1E: function(e) { this.$1$10 = ss.delegateRemove(this.$1$10, e) }, $1P: function(e) { this.$1$11 = ss.delegateCombine(this.$1$11, e) }, $1Q: function(e) { this.$1$11 = ss.delegateRemove(this.$1$11, e) }, $1R: function(e) { this.$1$12 = ss.delegateCombine(this.$1$12, e) }, $1S: function(e) { this.$1$12 = ss.delegateRemove(this.$1$12, e) }, $1N: function(e) { this.$1$13 = ss.delegateCombine(this.$1$13, e) }, $1O: function(e) { this.$1$13 = ss.delegateRemove(this.$1$13, e) }, $1V: function(e) { this.$1$14 = ss.delegateCombine(this.$1$14, e) }, $1W: function(e) { this.$1$14 = ss.delegateRemove(this.$1$14, e) }, $1T: function(e) { this.$1$15 = ss.delegateCombine(this.$1$15, e) }, $1U: function(e) { this.$1$15 = ss.delegateRemove(this.$1$15, e) }, get_hostId: function() { return this.$1r.hostId }, set_hostId: function(e) { this.$1r.hostId = e }, get_iframe: function() { return this.$1i }, get_instanceId: function() { return this.$1l }, set_instanceId: function(e) { this.$1l = e }, $x: function() { return this.$1t }, $s: function() { return this.$1h }, $u: function() { return this.$1m }, $t: function() { return this.$1i.style.display === 'none' }, $v: function() { return this.$1r.parentElement }, $w: function() { return this.$1r.get_baseUrl() }, $z: function() { return this.$1w.get_workbook() }, get__workbookImpl: function() { return this.$1w }, $r: function() { return this.$1g }, $y: function() { return this.$1u }, getCurrentUrlAsync: function() { var e = new tab._Deferred; var bn = new(ss.makeGenericType(tab.CommandReturnHandler$1, [String]))('api.GetCurrentUrlCommand', 0, function(bo) { e.resolve(bo) }, function(bo, bp) { e.reject(tab._TableauException.createInternalError(bp)) });
                this._sendCommand(String).call(this, null, bn); return e.get_promise() }, handleVizListening: function() { this.$3() }, handleVizLoad: function() { if (ss.isNullOrUndefined(this.$1u)) { this.$1e(this.$1j.width + 'px', this.$1j.height + 'px');
                    this.$h() } if (ss.isValue(this.$1s)) { this.$1s.style.display = 'none' } if (ss.isNullOrUndefined(this.$1w)) { this.$1w = new o(this, this.$1n, ss.mkdel(this, function() { this.$13(null) })) } else if (!this.$1k) { this.$1w._update(ss.mkdel(this, function() { this.$13(null) })) }
                this.sendScaleFactor('-1') }, $C: function(e) { var bn = this.$1u.chromeHeight; var bo = this.$1u.sheetSize; var bp = 0; var bq = 0; if (bo.behavior === 'exactly') { bp = bo.maxSize.width;
                    bq = bo.maxSize.height + bn } else { var br; var bs; var bt; var bu; switch (bo.behavior) {
                        case 'range':
                            { br = bo.minSize.width;bs = bo.maxSize.width;bt = bo.minSize.height + bn;bu = bo.maxSize.height + bn;bp = Math.max(br, Math.min(bs, e.width));bq = Math.max(bt, Math.min(bu, e.height)); break }
                        case 'atleast':
                            { br = bo.minSize.width;bt = bo.minSize.height + bn;bp = Math.max(br, e.width);bq = Math.max(bt, e.height); break }
                        case 'atmost':
                            { bs = bo.maxSize.width;bu = bo.maxSize.height + bn;bp = Math.min(bs, e.width);bq = Math.min(bu, e.height); break }
                        case 'automatic':
                            { bp = e.width;bq = Math.max(e.height, bn); break }
                        default:
                            { throw tab._TableauException.createInternalError('Unknown SheetSizeBehavior for viz: ' + bo.behavior.toString()) } } } return tab.Size.$ctor(bp, bq) }, $I: function() { var e; if (ss.isValue(this.$1j)) { e = this.$1j;
                    this.$1j = null } else { e = tab._Utility.computeContentSize(this.$v()) }
                this.$1c(e); return this.$C(e) }, $b: function() { if (!ss.isValue(this.$1u)) { return } var e = this.$I(); if (e.height === this.$1u.chromeHeight) { return }
                this.$1e(e.width + 'px', e.height + 'px'); var bn = 10; for (var bo = 0; bo < bn; bo++) { var bp = this.$I(); if (ss.referenceEquals(JSON.stringify(e), JSON.stringify(bp))) { return }
                    e = bp;
                    this.$1e(e.width + 'px', e.height + 'px') } throw tab._TableauException.create('maxVizResizeAttempts', 'Viz resize limit hit. The calculated iframe size did not stabilize after ' + bn + ' resizes.') }, handleEventNotification: function(e, bn) { var bo = tab._ApiServerNotification.deserialize(bn); switch (e) {
                    case 'api.FirstVizSizeKnownEvent':
                        { this.$P(bo); break }
                    case 'api.VizInteractiveEvent':
                        { this.$Y(bo); break }
                    case 'api.MarksSelectionChangedEvent':
                        { this.$S(bo); break }
                    case 'api.MarksHighlightChangedEvent':
                        { this.$R(bo); break }
                    case 'api.FilterChangedEvent':
                        { this.$O(bo); break }
                    case 'api.ParameterChangedEvent':
                        { this.$T(bo); break }
                    case 'api.CustomViewsListLoadedEvent':
                        { this.$N(bo); break }
                    case 'api.CustomViewUpdatedEvent':
                        { this.$M(bo); break }
                    case 'api.CustomViewRemovedEvent':
                        { this.$K(); break }
                    case 'api.CustomViewSetDefaultEvent':
                        { this.$L(bo); break }
                    case 'api.TabSwitchEvent':
                        { this.$V(bo); break }
                    case 'api.ToolbarStateChangedEvent':
                        { this.$W(bo); break }
                    case 'api.StorytellingStateChangedEvent':
                        { this.$U(bo); break }
                    case 'api.UrlActionEvent':
                        { this.$X(bo); break } } }, addEventListener: function(e, bn) { var bo = {}; if (!tab.PublicEnums.tryNormalizeEnum(tab.ApiTableauEventName).call(null, e, bo)) { throw tab._TableauException.createUnsupportedEventName(e.toString()) } switch (bo.$) {
                    case 'marksselection':
                        { this.$1J(bn); break }
                    case 'markshighlight':
                        { this.$1H(bn); break }
                    case 'parametervaluechange':
                        { this.$1L(bn); break }
                    case 'filterchange':
                        { this.$1F(bn); break }
                    case 'customviewload':
                        { this.$1x(bn); break }
                    case 'customviewsave':
                        { this.$1B(bn); break }
                    case 'customviewremove':
                        { this.$1z(bn); break }
                    case 'customviewsetdefault':
                        { this.$1D(bn); break }
                    case 'tabswitch':
                        { this.$1P(bn); break }
                    case 'storypointswitch':
                        { this.$1N(bn); break }
                    case 'toolbarstatechange':
                        { this.$1R(bn); break }
                    case 'vizresize':
                        { this.$1V(bn); break }
                    case 'urlaction':
                        { this.$1T(bn); break } } }, removeEventListener: function(e, bn) { var bo = {}; if (!tab.PublicEnums.tryNormalizeEnum(tab.ApiTableauEventName).call(null, e, bo)) { throw tab._TableauException.createUnsupportedEventName(e.toString()) } switch (bo.$) {
                    case 'marksselection':
                        { this.$1K(bn); break }
                    case 'markshighlight':
                        { this.$1I(bn); break }
                    case 'parametervaluechange':
                        { this.$1M(bn); break }
                    case 'filterchange':
                        { this.$1G(bn); break }
                    case 'customviewload':
                        { this.$1y(bn); break }
                    case 'customviewsave':
                        { this.$1C(bn); break }
                    case 'customviewremove':
                        { this.$1A(bn); break }
                    case 'customviewsetdefault':
                        { this.$1E(bn); break }
                    case 'tabswitch':
                        { this.$1Q(bn); break }
                    case 'toolbarstatechange':
                        { this.$1S(bn); break }
                    case 'storypointswitch':
                        { this.$1O(bn); break }
                    case 'vizresize':
                        { this.$1W(bn); break }
                    case 'urlaction':
                        { this.$1U(bn); break } } }, $2: function() { if (ss.isValue(this.$1i)) { this.$1i.parentNode.removeChild(this.$1i);
                    this.$1i = null }
                m.$2(this.$1t);
                this.$1n.get_router().unregisterHandler(this);
                this.$1d() }, $h: function() { this.$1i.style.display = 'block';
                this.$1i.style.visibility = 'visible' }, $5: function() { this.$1i.style.display = 'none' }, $6: function() { this.$1i.style.visibility = 'hidden' }, $l: function() { this.$10('showExportImageDialog') }, $k: function(e) { var bn = this.$1f(e);
                this.$10('showExportDataDialog', bn) }, $j: function(e) { var bn = this.$1f(e);
                this.$10('showExportCrosstabDialog', bn) }, $m: function() { this.$10('showExportPDFDialog') }, $n: function() { this.$10('showExportPowerPointDialog') }, $4: function(e) { var bn = this.$1f(e);
                this.$10('exportCrosstabToExcel', bn) }, $d: function() { return tab._Utility.noResultPromiseHelper('api.RevertAllCommand', null, this.$1n) }, $a: function() { return tab._Utility.noResultPromiseHelper('api.RefreshDataCommand', null, this.$1n) }, $o: function() { this.$10('showShareDialog') }, $i: function() { if (this.get__workbookImpl().get_isDownloadAllowed()) { this.$10('showDownloadWorkbookDialog') } else { throw tab._TableauException.create('downloadWorkbookNotAllowed', 'Download workbook is not allowed') } }, $7: function() { return this.$Z('pauseAutomaticUpdates') }, $c: function() { return this.$Z('resumeAutomaticUpdates') }, $p: function() { return this.$Z('toggleAutomaticUpdates') }, $g: function(e, bn) { this.$1c(tab.Size.$ctor(-1, -1));
                this.$1e(e, bn); if (ss.isValue(this.$1w)) { this.$1w._updateActiveSheetAsync() } }, $f: function(e) { this.$1g = e }, $0: function() { return this.$1r.parentElement }, $1: function() { try { m.$0(this.$1t) } catch (bn) { var e = ss.Exception.wrap(bn);
                    this.$2(); throw e } if (!this.$1r.fixedSize) { this.$1j = tab._Utility.computeContentSize(this.$v()); if (this.$1j.width === 0 || this.$1j.height === 0) { this.$1j = tab.Size.$ctor(800, 600) }
                    this.$1i = this.$E();
                    this.$6(); if (this.$1r.displayStaticImage) { this.$1s = this.$F(this.$1j.width + 'px', this.$1j.height + 'px');
                        this.$1s.style.display = 'block' } } else { if (this.$1r.displayStaticImage) { this.$1s = this.$F(this.$1r.width, this.$1r.height);
                        this.$1s.style.display = 'block' }
                    this.$1i = this.$E();
                    this.$h() } if (!tab._Utility.hasWindowPostMessage()) { if (tab._Utility.isIE()) { this.$1i['onreadystatechange'] = this.$J() } else { this.$1i.onload = this.$J() } }
                this.$1m = !this.$1r.toolbar;
                this.$1h = !this.$1r.tabs;
                this.$1n.get_router().registerHandler(this);
                this.$1i.src = this.$1r.get_url() }, $e: function() { try { if (!tab._Utility.hasWindowPostMessage() || ss.isNullOrUndefined(this.$1i) || !ss.isValue(this.$1i.contentWindow)) { return } } catch (bp) { return } var e = tab._Utility.visibleContentRectInDocumentCoordinates(this.get_iframe()); var bn = tab._Utility.contentRectInDocumentCoordinates(this.get_iframe()); var bo = new tab.NonApiCommand('layoutInfoResp', [(e.left - bn.left).toString(), (e.top - bn.top).toString(), e.width.toString(), e.height.toString()]);
                this.$1i.contentWindow.postMessage(bo.serialize(), '*') }, $3: function() { if (!tab._Utility.hasWindowPostMessage() || ss.isNullOrUndefined(this.$1i) || !ss.isValue(this.$1i.contentWindow)) { return } var e = new tab.NonApiCommand('tableau.enableVisibleRectCommunication', []);
                this.$1i.contentWindow.postMessage(e.serialize(), '*') }, $9: function() { return tab._Utility.noResultPromiseHelper('api.Redo', null, this.$1n) }, $q: function() { return tab._Utility.noResultPromiseHelper('api.Undo', null, this.$1n) }, sendScaleFactor: function(e) { var bn = document.documentElement.clientWidth / window.innerWidth; var bo = 0; var bp = 0; var bq = new tab.NonApiCommand('sf', [e, bn.toString(), bo.toString(), bp.toString()]); if (ss.isValue(this.$1i) && ss.isValue(this.$1i.contentWindow)) { this.$1i.contentWindow.postMessage(bq.serialize(), '*') } }, _sendCommand: function(e) { return function(bn, bo) { this.$1n.sendCommand(e).call(this.$1n, bn, bo) } }, $8: function(e) { if (!ss.staticEquals(this.$1$6, null)) { this.$1$6(new G('parametervaluechange', this.$1t, e)) } }, $14: function(e) { this.get__workbookImpl()._update(ss.mkdel(this, function() { if (!ss.staticEquals(this.$1$7, null)) { this.$1$7(new x('customviewload', this.$1t, (ss.isValue(e) ? e._impl : null))) } })) }, $16: function(e) { this.get__workbookImpl()._update(ss.mkdel(this, function() { if (!ss.staticEquals(this.$1$8, null)) { this.$1$8(new x('customviewsave', this.$1t, e._impl)) } })) }, $15: function(e) { if (!ss.staticEquals(this.$1$9, null)) { this.$1$9(new x('customviewremove', this.$1t, e._impl)) } }, $17: function(e) { if (!ss.staticEquals(this.$1$10, null)) { this.$1$10(new x('customviewsetdefault', this.$1t, e._impl)) } }, $1a: function(e, bn) { if (!ss.staticEquals(this.$1$11, null)) { this.$1$11(new K('tabswitch', this.$1t, e, bn)) } }, raiseStoryPointSwitch: function(e, bn) { if (!ss.staticEquals(this.$1$13, null)) { this.$1$13(new I('storypointswitch', this.$1t, e, bn)) } }, $19: function() { if (!ss.staticEquals(this.$1$2, null)) { this.$1$2(this) } }, $18: function() { if (!ss.staticEquals(this.$1$1, null)) { this.$1$1(this) } }, $1c: function(e) { if (!ss.staticEquals(this.$1$14, null)) { this.$1$14(new O('vizresize', this.$1t, e)) } }, $1b: function(e, bn) { if (!ss.staticEquals(this.$1$15, null)) { this.$1$15(new M('urlaction', this.$1t, e, bn)) } }, $1e: function(e, bn) { this.$1r.width = e;
                this.$1r.height = bn;
                this.$1i.style.width = this.$1r.width;
                this.$1i.style.height = this.$1r.height }, $1f: function(e) { if (ss.isNullOrUndefined(e)) { return null } var bn = this.$1w.$3(e); if (ss.isNullOrUndefined(bn)) { throw tab._TableauException.createNotActiveSheet() } return bn.get_name() }, $Z: function(e) { if (e !== 'pauseAutomaticUpdates' && e !== 'resumeAutomaticUpdates' && e !== 'toggleAutomaticUpdates') { throw tab._TableauException.createInternalError(null) } var bn = {};
                bn['api.invokeCommandName'] = e; var bo = new tab._Deferred; var bp = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.InvokeCommandCommand', 0, ss.mkdel(this, function(bq) { if (ss.isValue(bq) && ss.isValue(bq.isAutoUpdate)) { this.$1g = !bq.isAutoUpdate }
                    bo.resolve(this.$1g) }), function(bq, br) { bo.reject(tab._TableauException.createServerError(br)) });
                this._sendCommand(Object).call(this, bn, bp); return bo.get_promise() }, $10: function(e, bn) { if (e !== 'showExportImageDialog' && e !== 'showExportDataDialog' && e !== 'showExportCrosstabDialog' && e !== 'showExportPDFDialog' && e !== 'showShareDialog' && e !== 'showExportPowerPointDialog' && e !== 'exportCrosstabToExcel' && e !== 'showDownloadWorkbookDialog') { throw tab._TableauException.createInternalError(null) } var bo = {};
                bo['api.invokeCommandName'] = e; if (ss.isValue(bn)) { bo['api.invokeCommandParam'] = bn } var bp = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.InvokeCommandCommand', 0, null, null);
                this._sendCommand(Object).call(this, bo, bp) }, $P: function(e) { var bn = JSON.parse(e.get_data());
                this.$Q(bn) }, $Y: function(e) { if (ss.isValue(this.$1w) && ss.referenceEquals(this.$1w.get_name(), e.get_workbookName())) { this.$13(null) } else { this.$19() } }, $S: function(e) { if (ss.staticEquals(this.$1$3, null) || !ss.referenceEquals(this.$1w.get_name(), e.get_workbookName())) { return } var bn = null; var bo = this.$1w.get_activeSheetImpl(); if (bo.get_isStory()) { bo = bo.get_activeStoryPointImpl().get_containedSheetImpl() } if (ss.referenceEquals(bo.get_name(), e.get_worksheetName())) { bn = bo } else if (bo.get_isDashboard()) { var bp = bo;
                    bn = bp.get_worksheets()._get(e.get_worksheetName())._impl } if (ss.isValue(bn)) { bn.set_selectedMarks(null);
                    this.$1$3(new F('marksselection', this.$1t, bn)) } }, $R: function(e) { if (ss.staticEquals(this.$1$4, null) || !ss.referenceEquals(this.$1w.get_name(), e.get_workbookName())) { return } var bn = null; var bo = this.$1w.get_activeSheetImpl(); if (bo.get_isStory()) { bo = bo.get_activeStoryPointImpl().get_containedSheetImpl() } if (ss.referenceEquals(bo.get_name(), e.get_worksheetName())) { bn = bo } else if (bo.get_isDashboard()) { var bp = bo;
                    bn = bp.get_worksheets()._get(e.get_worksheetName())._impl } if (ss.isValue(bn)) { bn.highlightedMarks = null;
                    this.$1$4(new B('markshighlight', this.$1t, bn)) } }, $O: function(e) { if (ss.staticEquals(this.$1$5, null) || !ss.referenceEquals(this.$1w.get_name(), e.get_workbookName())) { return } var bn = null; var bo = this.$1w.get_activeSheetImpl(); if (ss.referenceEquals(bo.get_name(), e.get_worksheetName())) { bn = bo } else if (bo.get_isDashboard()) { var bp = bo;
                    bn = bp.get_worksheets()._get(e.get_worksheetName())._impl } else if (bo.get_isStory()) { var bq = bo; var br = bq.get_activeStoryPointImpl(); var bs = br.get_containedSheetImpl(); if (bs.get_isDashboard()) { var bt = bs;
                        bn = bt.get_worksheets()._get(e.get_worksheetName())._impl } else if (ss.referenceEquals(bs.get_name(), e.get_worksheetName())) { bn = bs } } if (ss.isValue(bn)) { var bu = JSON.parse(e.get_data()); var bv = bu[0]; var bw = bu[1];
                    this.$1$5(new z('filterchange', this.$1t, bn, bv, bw)) } }, $T: function(e) { if (!ss.staticEquals(this.$1$6, null)) { if (ss.referenceEquals(this.$1w.get_name(), e.get_workbookName())) { this.$1w.$g(null); var bn = e.get_data();
                        this.$8(bn) } } }, $N: function(e) { var bn = JSON.parse(e.get_data()); var bo = ss.mkdel(this, function() { c._processCustomViews(this.$1w, this.$1n, bn) }); var bp = ss.mkdel(this, function() { this.$18(); if (!ss.staticEquals(this.$1$7, null) && !bn.customViewLoaded) { this.$14(this.$1w.get_activeCustomView()) } }); if (ss.isNullOrUndefined(this.$1w)) { this.$1k = true;
                    this.$1w = new o(this, this.$1n, ss.mkdel(this, function() { bo();
                        this.$13(bp);
                        this.$1k = false })) } else { bo();
                    this.$G(bp) } }, $M: function(e) { var bn = JSON.parse(e.get_data()); if (ss.isNullOrUndefined(this.$1w)) { this.$1w = new o(this, this.$1n, null) } if (ss.isValue(this.$1w)) { c._processCustomViewUpdate(this.$1w, this.$1n, bn, true) } if (!ss.staticEquals(this.$1$8, null)) { var bo = this.$1w.$k()._toApiCollection(); for (var bp = 0, bq = bo.length; bp < bq; bp++) { this.$16(bo[bp]) } } }, $K: function() { if (!ss.staticEquals(this.$1$9, null)) { var e = this.$1w.$i()._toApiCollection(); for (var bn = 0, bo = e.length; bn < bo; bn++) { this.$15(e[bn]) } } }, $L: function(e) { var bn = JSON.parse(e.get_data()); if (ss.isValue(this.$1w)) { c._processCustomViews(this.$1w, this.$1n, bn) } if (!ss.staticEquals(this.$1$10, null) && ss.isValue(bn.defaultCustomViewId)) { var bo = this.$1w.$d(); for (var bp = 0; bp < bo.get__length(); bp++) { var bq = bo.get_item(bp); if (bq.getDefault()) { this.$17(bq); break } } } }, $V: function(e) { this.$1w._update(ss.mkdel(this, function() { if (ss.isValue(this.$A)) { this.$A() } if (ss.referenceEquals(this.$1w.get_name(), e.get_workbookName())) { var bn = e.get_worksheetName(); var bo = e.get_data();
                        this.$1a(bn, bo) }
                    this.$13(null) })) }, $W: function(e) { var bn = JSON.parse(e.get_data()); var bo = new l(this, bn); if (!ss.staticEquals(this.$1$12, null)) { this.$1$12(new L('toolbarstatechange', this.$1t, bo)) } }, $U: function(e) { var bn = this.$1w.get_activeSheetImpl(); if (bn.get_sheetType() === 'story') { bn.update(JSON.parse(e.get_data())) } }, $X: function(e) { if (!ss.staticEquals(this.$1$15, null)) { var bn = JSON.parse(e.get_data());
                    this.$1b(bn.url, bn.target) } }, $13: function(e) { if (!this.$1o) { var bn = this.$1p;
                    window.setTimeout(ss.mkdel(this, function() { if (this.$1o) { return } if (!ss.staticEquals(bn, null)) { bn(new J('firstinteractive', this.$1t)) } if (!ss.staticEquals(e, null)) { e() }
                        this.$1o = true }), 0) }
                this.$19() }, $G: function(e) { var bn = new Date; var bo = null;
                bo = ss.mkdel(this, function() { var bp = new Date; if (this.$1o) { e() } else if (bp - bn > 5 * 60 * 1000) { throw tab._TableauException.createInternalError('Timed out while waiting for the viz to become interactive') } else { window.setTimeout(bo, 10) } });
                bo() }, $D: function() { if (tab._Utility.isIE()) { if (this.$1i['readyState'] === 'complete') { this.handleVizLoad() } } else { this.handleVizLoad() } }, $11: function() { window.setTimeout(ss.mkdel(this, this.$D), 3000) }, $F: function(e, bn) { var bo = document.createElement('div');
                bo.style.background = "transparent url('" + this.$1r.staticImageUrl + "') no-repeat scroll 0 0";
                bo.style.left = '8px';
                bo.style.top = (this.$1r.tabs ? '31px' : '9px');
                bo.style.position = 'absolute';
                bo.style.width = e;
                bo.style.height = bn;
                this.$0().appendChild(bo); return bo }, $E: function() { if (ss.isNullOrUndefined(this.$0())) { return null } var e = document.createElement('IFrame');
                e.frameBorder = '0';
                e.setAttribute('allowTransparency', 'true');
                e.setAttribute('allowFullScreen', 'true');
                e.setAttribute('title', this.$H());
                e.marginHeight = '0';
                e.marginWidth = '0';
                e.style.display = 'block'; if (this.$1r.fixedSize) { e.style.width = this.$1r.width;
                    e.style.height = this.$1r.height;
                    e.setAttribute('scrolling', 'no') } else { e.style.width = '1px';
                    e.style.height = '1px';
                    e.setAttribute('scrolling', 'no') } if (tab._Utility.isSafari()) { e.addEventListener('mousewheel', ss.mkdel(this, this.$12), false) }
                this.$0().appendChild(e); return e }, $H: function() { var e = window.navigator.language; if (e === 'zh-CN') { return 'æ•°æ®å¯è§†åŒ–' } else if (e === 'zh-TW') { return 'è³‡æ–™å¯è¦–åŒ–' } else if (e === 'en-GB') { return 'Data Visualisation' } switch (e.substr(0, 2)) {
                    case 'fr':
                        { return 'Visualisation de donnÃ©es' }
                    case 'es':
                        { return 'VisualizaciÃ³n de datos' }
                    case 'it':
                        { return 'Visualizzazione dati' }
                    case 'pt':
                        { return 'VisualizaÃ§Ã£o de dados' }
                    case 'ja':
                        { return 'ãƒ‡ãƒ¼ã‚¿ ãƒ“ã‚¸ãƒ¥ã‚¢ãƒ©ã‚¤ã‚¼ãƒ¼ã‚·ãƒ§ãƒ³' }
                    case 'de':
                        { return 'Datenvisualisierung' }
                    case 'ko':
                        { return 'ë°ì´í„° ë¹„ì£¼ì–¼ë¦¬ì œì´ì…˜' }
                    case 'en':
                    default:
                        { return 'Data Visualization' } } }, $12: function(e) {}, $J: function() { return ss.mkdel(this, function(e) { this.$11() }) }, $Q: function(e) { var bn = tab.SheetSizeFactory.fromSizeConstraints(e.sizeConstraints);
                this.$1u = P.$ctor(bn, e.chromeHeight); if (ss.isValue(this.$1q)) { this.$1q(new A('firstvizsizeknown', this.$1t, this.$1u)) } if (this.$1r.fixedSize) { return }
                this.$b();
                this.$B();
                this.$h() }, $1d: function() { if (ss.isNullOrUndefined(this.$1v)) { return } if (tab._Utility.hasWindowAddEventListener()) { window.removeEventListener('resize', this.$1v, false) } else { window.self.detachEvent('onresize', this.$1v) }
                this.$1v = null }, $B: function() { if (ss.isValue(this.$1v)) { return }
                this.$1v = ss.mkdel(this, function() { this.$b() }); if (tab._Utility.hasWindowAddEventListener()) { window.addEventListener('resize', this.$1v, false) } else { window.self.attachEvent('onresize', this.$1v) } }, switchToViz: function(e) { var bn = new tab._Deferred; var bo = {};
                bo['api.invokeCommandParam'] = e; var bp = new(ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))('api.SwitchViz', 1, function(bq) { bn.resolve() }, function(bq, br) { bn.reject(tab._TableauException.createServerError(br)) });
                this.$1n.sendCommand(Object).call(this.$1n, bo, bp); return bn.get_promise() } }); var O = global.tab.VizResizeEvent = ss.mkType(a, 'tab.VizResizeEvent', function(e, bn, bo) { this.$2 = null;
            J.call(this, e, bn);
            this.$2 = bo }, { getAvailableSize: function() { return this.$2 } }); var P = global.tab.VizSize = ss.mkType(a, 'tab.VizSize', null, null, { $ctor: function(e, bn) { var bo = new Object;
                bo.sheetSize = null;
                bo.chromeHeight = 0;
                bo.sheetSize = e;
                bo.chromeHeight = bn; return bo }, isInstanceOfType: function() { return true } }); var Q = global.tab.WorksheetEvent = ss.mkType(a, 'tab.WorksheetEvent', function(e, bn, bo) { this.$2 = null;
            J.call(this, e, bn);
            this.$2 = bo }, { getWorksheet: function() { return this.$2.get_worksheet() } }); var R = global.tableauSoftware.CategoricalFilter = ss.mkType(a, 'tableauSoftware.CategoricalFilter', function(e, bn) { this.$b = false;
            this.$a = false;
            this.$9 = null;
            X.call(this, e, bn);
            this.$8(bn) }, { getIsExcludeMode: function() { return this.$b }, getIsAllSelected: function() { return this.$a }, getAppliedValues: function() { return this.$9 }, _updateFromJson: function(e) { this.$8(e) }, $8: function(e) { this.$b = e.isExclude;
                this.$a = e.isAllSelected; if (ss.isValue(e.appliedValues)) { this.$9 = []; for (var bn = 0; bn < e.appliedValues.length; bn++) { var bo = e.appliedValues[bn];
                        this.$9.push(tab._Utility.getDataValue(bo)) } } } }); var S = global.tableauSoftware.CustomView = ss.mkType(a, 'tableauSoftware.CustomView', function(e) { this._impl = null;
            this._impl = e }, { getWorkbook: function() { return this._impl.$a() }, getUrl: function() { return this._impl.$9() }, getName: function() { return this._impl.$6() }, setName: function(e) { this._impl.$7(e) }, getOwnerName: function() { return this._impl.$8() }, getAdvertised: function() { return this._impl.$2() }, setAdvertised: function(e) { this._impl.$3(e) }, getDefault: function() { return this._impl.$5() }, saveAsync: function() { return this._impl.$0() } }); var T = global.tableauSoftware.Dashboard = ss.mkType(a, 'tableauSoftware.Dashboard', function(e) { this._impl = null;
            bc.call(this, e) }, { getParentStoryPoint: function() { return this._impl.get_parentStoryPoint() }, getObjects: function() { return this._impl.get_objects()._toApiCollection() }, getWorksheets: function() { return this._impl.get_worksheets()._toApiCollection() } }); var U = global.tableauSoftware.DashboardObject = ss.mkType(a, 'tableauSoftware.DashboardObject', function(e, bn, bo) { this.$2 = null;
            this.$0 = null;
            this.$1 = null; if (e.objectType === 'worksheet' && ss.isNullOrUndefined(bo)) { throw tab._TableauException.createInternalError('worksheet parameter is required for WORKSHEET objects') } else if (e.objectType !== 'worksheet' && ss.isValue(bo)) { throw tab._TableauException.createInternalError('worksheet parameter should be undefined for non-WORKSHEET objects') }
            this.$2 = e;
            this.$0 = bn;
            this.$1 = bo }, { getObjectType: function() { return this.$2.objectType }, getDashboard: function() { return this.$0 }, getWorksheet: function() { return this.$1 }, getPosition: function() { return this.$2.position }, getSize: function() { return this.$2.size } }); var V = global.tableauSoftware.DataSource = ss.mkType(a, 'tableauSoftware.DataSource', function(e) { this.$0 = null;
            this.$0 = e }, { getName: function() { return this.$0.get_name() }, getFields: function() { return this.$0.get_fields()._toApiCollection() }, getIsPrimary: function() { return this.$0.get_isPrimary() } }); var W = global.tableauSoftware.Field = ss.mkType(a, 'tableauSoftware.Field', function(e, bn, bo, bp) { this.$0 = null;
            this.$3 = null;
            this.$2 = null;
            this.$1 = null;
            this.$0 = e;
            this.$3 = bn;
            this.$2 = bo;
            this.$1 = bp }, { getDataSource: function() { return this.$0 }, getName: function() { return this.$3 }, getRole: function() { return this.$2 }, getAggregation: function() { return this.$1 } }); var X = global.tableauSoftware.Filter = ss.mkType(a, 'tableauSoftware.Filter', function(e, bn) { this.$7 = null;
            this.$6 = null;
            this.$1 = null;
            this.$3 = null;
            this.$2 = null;
            this.$5 = null;
            this.$4 = null;
            this.$7 = e;
            this.$0(bn) }, { getFilterType: function() { return this.$6 }, getFieldName: function() { return this.$1 }, getWorksheet: function() { return this.$7.get_worksheet() }, getFieldAsync: function() { var e = new tab._Deferred; if (ss.isNullOrUndefined(this.$3)) { var bn = function(bp) { e.reject(bp); return null }; var bo = ss.mkdel(this, function(bp) { this.$3 = new W(bp, this.$1, this.$5, this.$4);
                        e.resolve(this.$3); return null });
                    this.$7.$j(this.$2).then(bo, bn) } else { window.setTimeout(ss.mkdel(this, function() { e.resolve(this.$3) }), 0) } return e.get_promise() }, _update: function(e) { this.$0(e);
                this._updateFromJson(e) }, _addFieldParams: function(e) {}, _updateFromJson: null, $0: function(e) { this.$1 = e.caption;
                this.$6 = tab.ApiEnumConverter.convertFilterType(e.filterType);
                this.$3 = null;
                this.$2 = e.dataSourceName;
                this.$5 = tab.ApiEnumConverter.convertFieldRole(ss.coalesce(e.fieldRole, 'unknown'));
                this.$4 = tab.ApiEnumConverter.convertFieldAggregation(ss.coalesce(e.fieldAggregation, 'NONE')) } }, { $0: function(e, bn) { switch (bn.filterType) {
                    case 'categorical':
                        { return new R(e, bn) }
                    case 'relativedate':
                        { return new bb(e, bn) }
                    case 'hierarchical':
                        { return new Y(e, bn) }
                    case 'quantitative':
                        { return new ba(e, bn) } } return null }, processFiltersList: function(e, bn) { var bo = new tab._Collection; for (var bp = 0; bp < bn.filters.length; bp++) { var bq = bn.filters[bp]; if (!bo._has(bq.caption)) { bo._add(bq.caption, bq.caption) } } var br = new tab._Collection; for (var bs = 0; bs < bn.filters.length; bs++) { var bt = bn.filters[bs]; var bu = X.$0(e, bt); if (!br._has(bt.caption)) { br._add(bt.caption, bu); continue } var bv = bt.caption.toString() + '_' + bt.filterType.toString(); var bw = bv; var bx = 1; while (bo._has(bw)) { bw = bv + '_' + bx;
                        bx++ }
                    br._add(bw, bu) } return br } }); var Y = global.tableauSoftware.HierarchicalFilter = ss.mkType(a, 'tableauSoftware.HierarchicalFilter', function(e, bn) { this.$9 = 0;
            X.call(this, e, bn);
            this.$8(bn) }, { _addFieldParams: function(e) { e['api.filterHierarchicalLevels'] = this.$9 }, _updateFromJson: function(e) { this.$8(e) }, $8: function(e) { this.$9 = e.levels } }); var Z = global.tableauSoftware.Parameter = ss.mkType(a, 'tableauSoftware.Parameter', function(e) { this._impl = null;
            this._impl = e }, { getName: function() { return this._impl.$7() }, getCurrentValue: function() { return this._impl.$2() }, getDataType: function() { return this._impl.$3() }, getAllowableValuesType: function() { return this._impl.$1() }, getAllowableValues: function() { return this._impl.$0() }, getMinValue: function() { return this._impl.$6() }, getMaxValue: function() { return this._impl.$5() }, getStepSize: function() { return this._impl.$9() }, getDateStepPeriod: function() { return this._impl.$4() } }); var ba = global.tableauSoftware.QuantitativeFilter = ss.mkType(a, 'tableauSoftware.QuantitativeFilter', function(e, bn) { this.$a = null;
            this.$9 = null;
            this.$d = null;
            this.$c = null;
            this.$b = false;
            X.call(this, e, bn);
            this.$8(bn) }, { getMin: function() { return this.$d }, getMax: function() { return this.$c }, getIncludeNullValues: function() { return this.$b }, getDomainMin: function() { return this.$a }, getDomainMax: function() { return this.$9 }, _updateFromJson: function(e) { this.$8(e) }, $8: function(e) { this.$a = tab._Utility.getDataValue(e.domainMinValue);
                this.$9 = tab._Utility.getDataValue(e.domainMaxValue);
                this.$d = tab._Utility.getDataValue(e.minValue);
                this.$c = tab._Utility.getDataValue(e.maxValue);
                this.$b = e.includeNullValues } }); var bb = global.tableauSoftware.RelativeDateFilter = ss.mkType(a, 'tableauSoftware.RelativeDateFilter', function(e, bn) { this.$9 = null;
            this.$b = null;
            this.$a = 0;
            X.call(this, e, bn);
            this.$8(bn) }, { getPeriod: function() { return this.$9 }, getRange: function() { return this.$b }, getRangeN: function() { return this.$a }, _updateFromJson: function(e) { this.$8(e) }, $8: function(e) { if (ss.isValue(e.periodType)) { this.$9 = tab.ApiEnumConverter.convertPeriodType(ss.unbox(e.periodType)) } if (ss.isValue(e.rangeType)) { this.$b = tab.ApiEnumConverter.convertDateRange(ss.unbox(e.rangeType)) } if (ss.isValue(e.rangeN)) { this.$a = ss.unbox(e.rangeN) } } }); var bc = global.tableauSoftware.Sheet = ss.mkType(a, 'tableauSoftware.Sheet', function(e) { this._impl = null;
            tab._Param.verifyValue(e, 'sheetImpl');
            this._impl = e }, { getName: function() { return this._impl.get_name() }, getIndex: function() { return this._impl.get_index() }, getWorkbook: function() { return this._impl.get_workbookImpl().get_workbook() }, getSize: function() { return this._impl.get_size() }, getIsHidden: function() { return this._impl.get_isHidden() }, getIsActive: function() { return this._impl.get_isActive() }, getSheetType: function() { return this._impl.get_sheetType() }, getUrl: function() { return this._impl.get_url() }, changeSizeAsync: function(e) { return this._impl.changeSizeAsync(e) } }); var bd = global.tableauSoftware.SheetInfo = ss.mkType(a, 'tableauSoftware.SheetInfo', function(e) { this.$0 = null;
            this.$0 = e }, { getName: function() { return this.$0.name }, getSheetType: function() { return this.$0.sheetType }, getSize: function() { return this.$0.size }, getIndex: function() { return this.$0.index }, getUrl: function() { return this.$0.url }, getIsActive: function() { return this.$0.isActive }, getIsHidden: function() { return this.$0.isHidden }, getWorkbook: function() { return this.$0.workbook } }); var be = global.tableauSoftware.Story = ss.mkType(a, 'tableauSoftware.Story', function(e) { this._impl = null;
            bc.call(this, e) }, { getActiveStoryPoint: function() { return this._impl.get_activeStoryPointImpl().get_storyPoint() }, getStoryPointsInfo: function() { return this._impl.get_storyPointsInfo() }, activatePreviousStoryPointAsync: function() { return this._impl.activatePreviousStoryPointAsync() }, activateNextStoryPointAsync: function() { return this._impl.activateNextStoryPointAsync() }, activateStoryPointAsync: function(e) { return this._impl.activateStoryPointAsync(e) }, revertStoryPointAsync: function(e) { return this._impl.revertStoryPointAsync(e) } }); var bf = global.tableauSoftware.StoryPoint = ss.mkType(a, 'tableauSoftware.StoryPoint', function(e) { this.$0 = null;
            this.$0 = e }, { getCaption: function() { return this.$0.get_caption() }, getContainedSheet: function() { return (ss.isValue(this.$0.get_containedSheetImpl()) ? this.$0.get_containedSheetImpl().get_sheet() : null) }, getIndex: function() { return this.$0.get_index() }, getIsActive: function() { return this.$0.get_isActive() }, getIsUpdated: function() { return this.$0.get_isUpdated() }, getParentStory: function() { return this.$0.get_parentStoryImpl().get_story() } }); var bg = global.tableauSoftware.StoryPointInfo = ss.mkType(a, 'tableauSoftware.StoryPointInfo', function(e) { this._impl = null;
            this._impl = e }, { getCaption: function() { return this._impl.caption }, getIndex: function() { return this._impl.index }, getIsActive: function() { return this._impl.isActive }, getIsUpdated: function() { return this._impl.isUpdated }, getParentStory: function() { return this._impl.parentStoryImpl.get_story() } }); var bh = global.tableauSoftware.ToolbarState = ss.mkType(a, 'tableauSoftware.ToolbarState', function(e) { this._impl = null;
            this._impl = e }, { getViz: function() { return this._impl.get_viz() }, isButtonEnabled: function(e) { return this._impl.isButtonEnabled(e) } }); var bi = global.tableauSoftware.Version = ss.mkType(a, 'tableauSoftware.Version', function(e, bn, bo, bp) { this.$0 = 0;
            this.$2 = 0;
            this.$3 = 0;
            this.$1 = null;
            this.$0 = e;
            this.$2 = bn;
            this.$3 = bo;
            this.$1 = ss.coalesce(bp, null) }, { getMajor: function() { return this.$0 }, getMinor: function() { return this.$2 }, getPatch: function() { return this.$3 }, getMetadata: function() { return this.$1 }, toString: function() { var e = this.$0 + '.' + this.$2 + '.' + this.$3; if (ss.isValue(this.$1) && this.$1.length > 0) { e += '-' + this.$1 } return e } }, { getCurrent: function() { return bi.$1 } }); var bj = global.tableauSoftware.Viz = ss.mkType(a, 'tableauSoftware.Viz', function(e, bn, bo) { this._impl = null; var bp = tab._ApiObjectRegistry.getApiMessageRouter();
            this._impl = new N(bp, this, e, bn, bo);
            this._impl.$1() }, { getAreTabsHidden: function() { return this._impl.$s() }, getIsToolbarHidden: function() { return this._impl.$u() }, getIsHidden: function() { return this._impl.$t() }, getInstanceId: function() { return this._impl.get_instanceId() }, getParentElement: function() { return this._impl.$v() }, getUrl: function() { return this._impl.$w() }, getVizSize: function() { return this._impl.$y() }, getWorkbook: function() { return this._impl.$z() }, getAreAutomaticUpdatesPaused: function() { return this._impl.$r() }, getCurrentUrlAsync: function() { return this._impl.getCurrentUrlAsync() }, addEventListener: function(e, bn) { this._impl.addEventListener(e, bn) }, removeEventListener: function(e, bn) { this._impl.removeEventListener(e, bn) }, dispose: function() { this._impl.$2() }, switchToViz: function(e) { return this._impl.switchToViz(e) }, show: function() { this._impl.$h() }, hide: function() { this._impl.$5() }, showExportDataDialog: function(e) { this._impl.$k(e) }, showExportCrossTabDialog: function(e) { this._impl.$j(e) }, showExportImageDialog: function() { this._impl.$l() }, showExportPDFDialog: function() { this._impl.$m() }, showExportPowerPointDialog: function() { this._impl.$n() }, exportCrossTabToExcel: function(e) { this._impl.$4(e) }, revertAllAsync: function() { return this._impl.$d() }, refreshDataAsync: function() { return this._impl.$a() }, showShareDialog: function() { this._impl.$o() }, showDownloadWorkbookDialog: function() { this._impl.$i() }, pauseAutomaticUpdatesAsync: function() { return this._impl.$7() }, resumeAutomaticUpdatesAsync: function() { return this._impl.$c() }, toggleAutomaticUpdatesAsync: function() { return this._impl.$p() }, refreshSize: function() { this._impl.$b() }, setFrameSize: function(e, bn) { var bo = e; var bp = bn; if (tab._Utility.isNumber(e)) { bo = e.toString() + 'px' } if (tab._Utility.isNumber(bn)) { bp = bn.toString() + 'px' }
                this._impl.$g(bo, bp) }, redoAsync: function() { return this._impl.$9() }, undoAsync: function() { return this._impl.$q() } }); var bk = global.tableauSoftware.VizManager = ss.mkType(a, 'tableauSoftware.VizManager', null, null, { getVizs: function() { return m.$3() } }); var bl = global.tableauSoftware.Workbook = ss.mkType(a, 'tableauSoftware.Workbook', function(e) { this.$0 = null;
            this.$0 = e }, { getViz: function() { return this.$0.get_viz() }, getPublishedSheetsInfo: function() { return this.$0.get_publishedSheets()._toApiCollection() }, getName: function() { return this.$0.get_name() }, getActiveSheet: function() { return this.$0.get_activeSheetImpl().get_sheet() }, getActiveCustomView: function() { return this.$0.get_activeCustomView() }, activateSheetAsync: function(e) { return this.$0._setActiveSheetAsync(e) }, revertAllAsync: function() { return this.$0._revertAllAsync() }, getCustomViewsAsync: function() { return this.$0.$4() }, showCustomViewAsync: function(e) { return this.$0.$a(e) }, removeCustomViewAsync: function(e) { return this.$0.$8(e) }, rememberCustomViewAsync: function(e) { return this.$0.$7(e) }, setActiveCustomViewAsDefaultAsync: function() { return this.$0.$9() }, getParametersAsync: function() { return this.$0.$5() }, changeParameterValueAsync: function(e, bn) { return this.$0.$2(e, bn) } }); var bm = global.tableauSoftware.Worksheet = ss.mkType(a, 'tableauSoftware.Worksheet', function(e) { this._impl = null;
            bc.call(this, e) }, { getParentDashboard: function() { return this._impl.get_parentDashboard() }, getParentStoryPoint: function() { return this._impl.get_parentStoryPoint() }, getDataSourcesAsync: function() { return this._impl.$k() }, getFilterAsync: function(e, bn) { return this._impl.$l(null, e, bn) }, getFiltersAsync: function(e) { return this._impl.$m(e) }, applyFilterAsync: function(e, bn, bo, bp) { return this._impl.$c(e, bn, bo, bp) }, clearFilterAsync: function(e) { return this._impl.$g(e) }, applyRangeFilterAsync: function(e, bn) { return this._impl.$e(e, bn) }, applyRelativeDateFilterAsync: function(e, bn) { return this._impl.$f(e, bn) }, applyHierarchicalFilterAsync: function(e, bn, bo, bp) { return this._impl.$d(e, bn, bo, bp) }, clearSelectedMarksAsync: function() { return this._impl.$i() }, selectMarksAsync: function(e, bn, bo) { return this._impl.$v(e, bn, bo) }, getSelectedMarksAsync: function() { return this._impl.$o() }, getSummaryDataAsync: function(e) { return this._impl.$p(e) }, getUnderlyingDataAsync: function(e) { console.warn('Method getUnderlyingDataAsync is deprecated. Please use getUnderlyingTableDataAsync instead.'); return this._impl.$q(e) }, getUnderlyingTablesAsync: function() { return this._impl.$s() }, getUnderlyingTableDataAsync: function(e, bn) { return this._impl.$r(e, bn) }, clearHighlightedMarksAsync: function() { return this._impl.$h() }, highlightMarksAsync: function(e, bn) { return this._impl.$t(e, bn) }, highlightMarksByPatternMatchAsync: function(e, bn) { return this._impl.$u(e, bn) }, getHighlightedMarksAsync: function() { return this._impl.$n() } });
        ss.initClass(b);
        ss.initClass(c);
        ss.initClass(g);
        ss.initClass(d, g);
        ss.initClass(f);
        ss.initClass(h, Object);
        ss.initClass(i, g);
        ss.initClass(j);
        ss.initClass(k, Object);
        ss.initClass(l);
        ss.initClass(m);
        ss.initClass(n);
        ss.initClass(o);
        ss.initClass(p, g);
        ss.initClass(y);
        ss.initClass(q, y);
        ss.initClass(r, y);
        ss.initClass(s, y);
        ss.initClass(t, y);
        ss.initClass(u, y);
        ss.initClass(v);
        ss.initClass(w);
        ss.initClass(J);
        ss.initClass(x, J);
        ss.initClass(Q, J);
        ss.initClass(z, Q);
        ss.initClass(A, J);
        ss.initClass(B, Q);
        ss.initInterface(C, { add_customViewsListLoad: null, remove_customViewsListLoad: null, handleVizLoad: null, handleVizListening: null, sendScaleFactor: null });
        ss.initClass(D);
        ss.initClass(E);
        ss.initClass(F, Q);
        ss.initClass(G, J);
        ss.initClass(H);
        ss.initClass(I, J);
        ss.initClass(K, J);
        ss.initClass(L, J);
        ss.initClass(M, J);
        ss.initClass(N, null, [C]);
        ss.initClass(O, J);
        ss.initClass(P, Object);
        ss.initClass(X);
        ss.initClass(R, X);
        ss.initClass(S);
        ss.initClass(bc);
        ss.initClass(T, bc);
        ss.initClass(U);
        ss.initClass(V);
        ss.initClass(W);
        ss.initClass(Y, X);
        ss.initClass(Z);
        ss.initClass(ba, X);
        ss.initClass(bb, X);
        ss.initClass(bd);
        ss.initClass(be, bc);
        ss.initClass(bf);
        ss.initClass(bg);
        ss.initClass(bh);
        ss.initClass(bi);
        ss.initClass(bj);
        ss.initClass(bk);
        ss.initClass(bl);
        ss.initClass(bm, bc);
        (function() { m.$6 = [] })();
        (function() { g.noZoneId = 4294967295 })();
        (function() { p.$3 = new RegExp('\\[[^\\]]+\\]\\.', 'g') })();
        (function() { bi.$1 = new bi(2, 6, 0, 'null') })() })();
    window.tableau = window.tableauSoftware = global.tableauSoftware;
    tableauSoftware.Promise = tab._PromiseImpl;
    tab._Deferred = tab._DeferredImpl;
    tab._Collection = tab._CollectionImpl;
    tab._ApiBootstrap.initialize();
    window.tableau._apiLoaded = true
})();
module.exports = tableauSoftware;