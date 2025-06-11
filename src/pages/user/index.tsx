import React, { useState } from "react";
import { style } from "./styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View, Alert, TouchableOpacity, Modal, TextInput } from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function User() {
    const navigation = useNavigation<NavigationProp<any>>();

    // Estados para modais
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'dados' | 'saude' | null>(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editType, setEditType] = useState<'dados' | 'saude' | null>(null);

    // Estados para informações públicas
    const [nome, setNome] = useState('Humberto Melo');
    const [email, setEmail] = useState('h1melo@email.com');
    const [idade, setIdade] = useState('25');
    const [telefone, setTelefone] = useState('34999999999');
    const [residencia, setResidencia] = useState('Rua Dos Sonhos, 123, Araxá, MG');

    // Estados para informações de saúde
    const [peso, setPeso] = useState('0');
    const [altura, setAltura] = useState('0');
    const [tipoSanquineo, setTipoSanquineo] = useState('A, B, AB ou O');
    const [alergias, setAlergias] = useState('Bezetacil, Dipirona, etc.');

    // Estados temporários para edição
    const [editNome, setEditNome] = useState(nome);
    const [editEmail, setEditEmail] = useState(email);
    const [editIdade, setEditIdade] = useState(idade);
    const [editTelefone, setEditTelefone] = useState(telefone);
    const [editResidencia, setEditResidencia] = useState(residencia);

    const [editPeso, setEditPeso] = useState(peso);
    const [editAltura, setEditAltura] = useState(altura);
    const [editTipoSanquineo, setEditTipoSanquineo] = useState(tipoSanquineo);
    const [editAlergias, setEditAlergias] = useState(alergias);

    const handleLogout = () => {
        return navigation.reset({ routes: [{ name: 'Login' }] });
    };

    // Abrir modal de visualização
    const openModal = (type: 'dados' | 'saude') => {
        setModalType(type);
        setModalVisible(true);
    };

    // Abrir modal de edição
    const openEditModal = (type: 'dados' | 'saude') => {
        setEditType(type);
        if (type === 'dados') {
            setEditNome(nome);
            setEditEmail(email);
            setEditIdade(idade);
            setEditTelefone(telefone);
            setEditResidencia(residencia);
        } else {
            setEditPeso(peso);
            setEditAltura(altura);
            setEditTipoSanquineo(tipoSanquineo);
            setEditAlergias(alergias);
        }
        setEditModalVisible(true);
    };

    // Salvar alterações
    const handleSaveEdit = () => {
        if (editType === 'dados') {
            setNome(editNome);
            setEmail(editEmail);
            setIdade(editIdade);
            setTelefone(editTelefone);
            setResidencia(editResidencia);
        } else {
            setPeso(editPeso);
            setAltura(editAltura);
            setTipoSanquineo(editTipoSanquineo);
            setAlergias(editAlergias);
        }
        setEditModalVisible(false);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalType(null);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
        setEditType(null);
    };

    return (
        <View style={style.container}>
            <View style={style.header}>
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 80,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <MaterialIcons
                        name="person"
                        color="red"
                        size={100}
                    />
                </View>
                <Text style={style.name}>Meu Perfil</Text>
            </View>
            <View style={[
                style.boxCenter,
                {
                    backgroundColor: '#f2f2f2',
                    borderRadius: 12,
                    padding: 16,
                    marginTop: 16,
                    flexDirection: 'column',
                    alignItems: 'center'
                }
            ]}>
                {/* Meus Dados */}
                <View style={style.rowButton}>
                    <TouchableOpacity
                        style={style.editSquare}
                        onPress={() => openEditModal('dados')}
                    >
                        <MaterialIcons name="edit" size={24} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.buttonWhite}
                        onPress={() => openModal('dados')}
                    >
                        <Text style={style.buttonText}>Meus Dados</Text>
                    </TouchableOpacity>
                </View>
                {/* Saúde */}
                <View style={style.rowButton}>
                    <TouchableOpacity
                        style={style.editSquare}
                        onPress={() => openEditModal('saude')}
                    >
                        <MaterialIcons name="edit" size={24} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={style.buttonWhite}
                        onPress={() => openModal('saude')}
                    >
                        <Text style={style.buttonText}>Saúde</Text>
                    </TouchableOpacity>
                </View>
                {/* Configurações */}
                <View style={style.rowButton}>
                    <View style={style.editSquare}>
                        <MaterialIcons name="edit" size={24} color="#ccc" />
                    </View>
                    <TouchableOpacity
                        style={style.buttonWhite}
                        onPress={() => Alert.alert('Em desenvolvimento')}
                    >
                        <Text style={style.buttonText}>Configurações</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal de visualização */}
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 24,
                        width: '80%',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>
                            {modalType === 'dados' ? 'Meus Dados' : 'Saúde'}
                        </Text>
                        {modalType === 'dados' && (
                            <>
                                <Text>Nome: {nome}</Text>
                                <Text>Email: {email}</Text>
                                <Text>Idade: {idade}</Text>
                                <Text>Telefone: {telefone}</Text>
                                <Text>Residência: {residencia}</Text>
                            </>
                        )}
                        {modalType === 'saude' && (
                            <>
                                <Text>Peso: {peso} kg</Text>
                                <Text>Altura: {altura} cm</Text>
                                <Text>Tipo Sanguíneo: {tipoSanquineo} </Text>
                                <Text>Alergias: {alergias}</Text>
                            </>
                        )}
                        <TouchableOpacity onPress={closeModal} style={{ marginTop: 24 }}>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de edição */}
            <Modal
                visible={editModalVisible}
                transparent
                animationType="slide"
                onRequestClose={closeEditModal}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 24,
                        width: '80%',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>
                            {editType === 'dados' ? 'Editar Dados' : 'Editar Saúde'}
                        </Text>
                        {editType === 'dados' && (
                            <>
                                <TextInput
                                    style={style.input}
                                    placeholder="Nome"
                                    value={editNome}
                                    onChangeText={setEditNome}
                                />
                                <TextInput
                                    style={style.input}
                                    placeholder="Email"
                                    value={editEmail}
                                    onChangeText={setEditEmail}
                                    keyboardType="email-address"
                                />
                                <TextInput
                                    style={style.input}
                                    placeholder="Idade"
                                    value={editIdade}
                                    onChangeText={setEditIdade}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={style.input}
                                    placeholder="Telefone"
                                    value={editTelefone}
                                    onChangeText={setEditTelefone}
                                    keyboardType="phone-pad"
                                />
                                <TextInput
                                    style={style.input}
                                    placeholder="Residência"
                                    value={editResidencia}
                                    onChangeText={setEditResidencia}
                                />
                            </>
                        )}
                        {editType === 'saude' && (
                            <>
                                <TextInput
                                    style={style.input}
                                    placeholder="Peso (kg)"
                                    value={editPeso}
                                    onChangeText={setEditPeso}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={style.input}
                                    placeholder="Altura (cm)"
                                    value={editAltura}
                                    onChangeText={setEditAltura}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={style.input}
                                    placeholder="Tipo Sanguíneo"
                                    value={editTipoSanquineo}
                                    onChangeText={setEditTipoSanquineo}
                                />
                                <TextInput
                                    style={style.input}
                                    placeholder="Alergias"
                                    value={editAlergias}
                                    onChangeText={setEditAlergias}
                                />
                            </>
                        )}
                        <View style={{ flexDirection: 'row', marginTop: 24 }}>
                            <TouchableOpacity onPress={closeEditModal} style={{ marginRight: 24 }}>
                                <Text style={{ color: '#888', fontWeight: 'bold' }}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSaveEdit}>
                                <Text style={{ color: 'green', fontWeight: 'bold' }}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={style.boxEnd}>
                <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
                    <MaterialIcons
                        name="logout"
                        style={{ color: 'white' }}
                        size={40}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}